import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user';
import { ShopService } from 'src/app/_services/shop.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private shopService: ShopService, private router: Router) { }

  username: string;
  password: string;
  password2: string;
  id: number;
  email: string;
  user: User;
  users: User[];
  token: string = '';
  temp: boolean = true;
  pw: string;

  ngOnInit(): void {
    this.getUsers();
  }

  onSubmit() {
    this.getUsers();
    this.users.forEach(element => {
      if (this.username === element.username && this.email === element.email) {
        this.temp = false;
        alert('This username and e-mail address is already taken.');
      } else if (this.username === element.username) {
        this.temp = false;
        alert('This username is already taken.');
      } else if (this.email === element.email) {
        this.temp = false;
        alert('This e-mail address is already taken.');
      }
    });
    if (this.temp) {
      this.getId();
      if (this.password !== this.password2) {
        alert('The two passwords do not match!');
      } else {
        this.pw = this.password;
        let obj: User = {
          id: this.id,
          username: this.username,
          password: this.pw,
          email: this.email,
          token: this.token
        }
        this.shopService.addUser(obj).subscribe(() => {
          this.shopService.getAllUsers();
        });
        alert('User successfully registered. Log in!')
        this.router.navigate(['/login']);
      }
    }
  }

  getId() {
    this.id = 0;
    this.shopService.getAllUsers().subscribe(data => {
      this.id = data.length + 1;
    })
  }

  getUsers() {
    this.shopService.getAllUsers().subscribe(data => {
      setTimeout(() => {
        this.users = data;
        console.log(this.users);
      }, 200);
    });
  }

}
