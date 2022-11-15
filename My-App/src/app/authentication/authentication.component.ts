import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AuthenticationService,
  AuthResponseData,
} from './authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './authentication.component.html',
})
export class AuthComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  isLoginMode = true;
  isLoading = false;
  errorMessage = '';

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;
    this.isLoading = true;
    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObservable = this.authenticationService.logIn(email, password);
    } else {
      authObservable = this.authenticationService.signUp(email, password);
    }

    authObservable.subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error;
        console.log(error);
      }
    );
  }
}
