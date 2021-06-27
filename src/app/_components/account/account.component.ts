import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user';
import { ShopService } from 'src/app/_services/shop.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private router: Router, public shopService: ShopService) { }

  user: User;
  edit: boolean;
  oldpass: string;
  newpass: string;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onSubmit() {
    if (this.oldpass === this.user.password) {
      this.user.password = this.newpass;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.shopService.updateUser(this.user).subscribe(() => {
        this.shopService.getAllUsers();
      });
      this.editing();
    } else {
      alert('Your old password is incorrect');
    }
  }

  delete() {
    confirm('Are you sure you want to delete your user? You will be logged out.') ?
      this.shopService.deleteUser(this.user.id).subscribe(() => {
        setTimeout(() => {
          this.shopService.getAllUsers();
          localStorage.removeItem('user');
          this.router.navigate(['/home']);
        }, 100);
      })
      : "";
  }

  logout() {
    if (confirm('Are you sure you want to log out?')) {
      this.user.token = '';
      localStorage.setItem('user', JSON.stringify(this.user));
      this.router.navigate(['/home']);
      console.log('Logged out: ' + this.user.username + ' ' + JSON.stringify(this.user));
    }
  }

  editing() {
    this.edit = !this.edit;
    if (this.edit) {
      this.oldpass = '';
      this.newpass = '';
    }
  }

}
