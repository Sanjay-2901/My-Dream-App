import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { DataStorageService } from '../shared/data-storage.service';

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
   
  ) {}

  ngOnInit() {
    this.userSubscription = this.authenticationService.emitUser.subscribe(
      (user) => {
        if (user) {
          this.isAuthenticated = true;
        }
      }
    );
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
