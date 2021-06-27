import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user';
import { AuthService } from 'src/app/_services/auth.service';
import { ShopService } from 'src/app/_services/shop.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private shopService: ShopService, private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
  }

  username: string = '';
  password: string = '';
  user: User;
  temp: boolean = false;

  onSubmit() {
    this.shopService.getAllUsers().subscribe(data => {
      if (data.length) {
        data.forEach(element => {
          if (element.username === this.username && element.password === this.password) {
            this.temp = true;
            this.user = element;
            return;
          }
        });
        if (this.temp) {
          this.user.token = "jwt-token"
          console.log('Logged in: ' + JSON.stringify(this.user));
          localStorage.setItem('user', JSON.stringify(this.user));
          this.router.navigate(['/home']);
          this.authService.getUsername();
        } else {
          alert('Wrong username or password!');
        }
      }
    });
  }
}
