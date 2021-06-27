import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { User } from 'src/app/user';
import { AuthService } from 'src/app/_services/auth.service';
import { ShopService } from 'src/app/_services/shop.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public shopService: ShopService, public authService: AuthService) { }

  cart: Product[];
  user: User;
  username: string;
  
  ngOnInit(): void {
    setTimeout(() => this.shopService.getCartNum(), 300);
    setTimeout(() => this.authService.getUsername(), 100);
  }
}
