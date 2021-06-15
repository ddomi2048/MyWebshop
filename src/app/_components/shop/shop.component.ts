import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ShopService } from 'src/app/_services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: Product[];
  product: Product;
  carts: Product[];
  cart: Product;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCart();
  }

  getAllProducts() {
    this.shopService.getAllProducts().subscribe(data => this.products = data);
  }

  getProductById(id) {
    this.shopService.getProductById(id).subscribe(data => { this.product = data; console.log(this.product) });
  }

  getAllCart() {
    this.shopService.getAllCart().subscribe(data => this.carts = data);
  }

  getCartById(id) {
    this.shopService.getCartById(id).subscribe(data => { this.cart = data; console.log(this.cart) });
  }

  onAdd(id) {
    this.getProductById(id);
    this.getCartById(id);
    if (!this.cart) {
      let obj = this.product;
      this.shopService.addToCart(obj).subscribe(() => {
        this.shopService.getAllCart();
      });
    } else {
      this.cart.quantity++;
      this.shopService.updateCart(this.cart).subscribe(() => {
        this.shopService.getAllCart();
      });
    }
  }
}
