import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Product } from '../product';
import { catchError, tap } from 'rxjs/operators';


const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  qty: number = 0;
  cart: Product[];
  temp: boolean;
  temp2: number;

  getCartNum() {
    this.qty = 0;
    this.getAllCart().subscribe(data => {
      this.cart = data;
      this.cart.forEach(item => {
        this.qty += item.quantity;
      });
    });
  }

  helper() {
    setTimeout(() => {
      if (this.qty) {
        this.temp = true;
      } else {
        this.temp = false;
      }
    }, 300);
  }

  getAllProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}/items`, httpOption);
  }

  getProductById(id) {
    return this.http.get<Product>(`${environment.apiUrl}/items/${id}`, httpOption);
  }

  getAllCart() {
    return this.http.get<Product[]>(`${environment.apiUrl}/cart`, httpOption);
  }

  getCartById(id) {
    return this.http.get<Product>(`${environment.apiUrl}/cart/${id}`, httpOption);
  }

  addToCart(product: Product) {
    return this.http.post<Product>(`${environment.apiUrl}/cart`, product, httpOption).pipe(
      tap((product: Product) => console.log(`Added to cart = ${JSON.stringify(product)}`)),
      catchError(error => error)
    );
  }

  updateCart(product: Product) {
    return this.http.put(`${environment.apiUrl}/cart/${product.id}`, product, httpOption).pipe(
      tap(updateCart => console.log(`Updated cart = ${JSON.stringify(updateCart)}`)),
      catchError(error => error)
    );
  }

  deleteCart(id) {
    return this.http.delete<Product>(`${environment.apiUrl}/cart/${id}`, httpOption).pipe(
      tap(() => console.log(`Removed from cart = ${id}`)),
      catchError(error => error)
    );
  }
}
