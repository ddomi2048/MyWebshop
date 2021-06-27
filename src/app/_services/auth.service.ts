import { Injectable } from '@angular/core';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  user: User;
  username: string;

  isLoggedIn() {

    const user: User = JSON.parse(localStorage.getItem('user'));

    if (user) {
      if (user.token === 'jwt-token') {
        return true
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getUsername() {
    setTimeout(() => {
      this.user = JSON.parse(localStorage.getItem('user'));
      if (this.user) {
        this.username = this.user.username;
      }
    }, 400);
  }
}
