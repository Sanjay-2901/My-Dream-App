export class AuthService {
  isLoggedIn = false;

  isAuthenticated() {
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isLoggedIn);
      }, 0);
    });
    return myPromise;
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }
}
