import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/product';
import { User } from 'src/app/user';
import { AuthService } from 'src/app/_services/auth.service';
import { ShopService } from 'src/app/_services/shop.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public shopService: ShopService, private authService: AuthService, private router: Router) { }

  carts: Product[];
  cart: Product;
  total: number;
  user: User;

  ngOnInit(): void {
    this.shopService.getAllCart();
    this.getAllCart();
    this.totalSum();
    setTimeout(() => this.shopService.helper(), 200);
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  getAllCart() {
    this.shopService.getAllCart().subscribe(data => {
      setTimeout(() => {
        this.carts = data;
      }, 60);
    });
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
        setTimeout(() => this.totalSum(), 200);
        setTimeout(() => this.shopService.getAllCart(), 200);
        setTimeout(() => this.getAllCart(), 200);
      });
    });
  }

  decrease(id) {
    this.shopService.getCartById(id).subscribe(data => {
      if (data.quantity > 1) {
        data.quantity--;
        this.shopService.updateCart(data).subscribe(() => {
          this.shopService.getCartNum();
          setTimeout(() => this.totalSum(), 200);
          setTimeout(() => this.shopService.getAllCart(), 200);
          setTimeout(() => this.getAllCart(), 200);
        });
      } else {
        this.delete(id);
      }
    });
  }

  delete(id) {
    confirm("Are you sure you want to delete this item?") ?
      this.shopService.deleteCart(id).subscribe(() => {
        this.shopService.getCartNum();
        setTimeout(() => this.totalSum(), 200);
        setTimeout(() => this.shopService.getAllCart(), 250);
        setTimeout(() => this.getAllCart(), 300);
      })
      : '';
    this.shopService.helper();
  }

  maxId() {
    return (Math.max.apply(Math, this.carts.map(function (x) {
      return x.id;
    })));
  }

  checkout() {
    if (this.authService.isLoggedIn()) {
      if (confirm('$' + this.total + ' will be withdrawn from your account, do you want to continue?')) {
        this.router.navigate(['/checkout']);
        for (let i = 1; i <= this.maxId(); i++) {
          this.shopService.deleteCart(i).subscribe(() => {
            this.shopService.getCartNum();
            this.shopService.getAllCart();
          });
        }
      } else {

      }
    } else {
      alert('You need to log in if you want to checkout!');
      this.router.navigate(['/login']);
    }
  }
}
