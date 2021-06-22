import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ShopService } from 'src/app/_services/shop.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public shopService: ShopService) { }

  carts: Product[];
  cart: Product;
  total: number;

  ngOnInit(): void {
    this.getAllCart();
    this.totalSum();
    this.shopService.helper();
  }

  getAllCart() {
    this.shopService.getAllCart().subscribe(data => this.carts = data);
  }

  getCartById(id) {
    this.shopService.getCartById(id).subscribe(data => this.cart = data);
  }

  totalSum() {
    this.shopService.getAllCart().subscribe(data => {
      let temp = 0;
      data.forEach(cart => {
        temp += cart.price * cart.quantity;
      });
      this.total = temp;
    });
  }

  increase(id) {
    this.shopService.getCartById(id).subscribe(data => {
      data.quantity++;
      this.shopService.updateCart(data).subscribe(() => {
        this.shopService.getCartNum();
        this.totalSum();
        setTimeout(() => this.shopService.getAllCart(), 200);
        this.getAllCart();
      });
    });
  }

  decrease(id) {
    this.shopService.getCartById(id).subscribe(data => {
      if (data.quantity > 1) {
        data.quantity--;
        this.shopService.updateCart(data).subscribe(() => {
          this.shopService.getCartNum();
          this.totalSum();
          setTimeout(() => this.shopService.getAllCart(), 200);
          this.getAllCart();
        });
      } else {
        this.delete(id);
      }
    });
  }

  delete(id) {
    confirm("Are you sure you want to delete this hero?") ?
      this.shopService.deleteCart(id).subscribe(() => {
        this.shopService.getCartNum();
        this.totalSum();
        setTimeout(() => this.shopService.getAllCart(), 200);
        this.getAllCart();
      })
      : '';
      this.shopService.helper();
  }
}
