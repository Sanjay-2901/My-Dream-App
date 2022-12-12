import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSubscription!: Subscription;
  token: string | null = null;
  constructor(
    private dataStorageService: DataStorageService,
    private authenticationService: AuthenticationService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.userSubscription = this.store
      .select('myAuth')
      .pipe(
        map((authState) => {
          return authState.user;
        })
      )
      .subscribe((user) => {
        if (user) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
      });
  }

  onSavedata() {
    this.dataStorageService.storeRecipes();
  }

  onfetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authenticationService.logOut();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
