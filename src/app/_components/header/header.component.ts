import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ShopService } from 'src/app/_services/shop.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private shopService: ShopService) { }

  cart: Product[];
  qty: number = 0;

  ngOnInit(): void {
    this.getCartNum();
  }

  getCartNum() {
    this.shopService.getAllCart().subscribe(data => {
      this.cart = data;
      this.cart.forEach(item => {
        this.qty += item.quantity;
      });
    });
  }
}
