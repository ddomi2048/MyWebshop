import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ShopService } from 'src/app/_services/shop.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public shopService: ShopService) { }

  cart: Product[];
  
  ngOnInit(): void {
    this.shopService.getCartNum();
  }

}
