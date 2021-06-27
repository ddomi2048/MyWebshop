import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Product } from '../product';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../user';


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

  getAllUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`, httpOption);
  }

  getUserById(id) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`, httpOption);
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

  deleteUser(id) {
    return this.http.delete<User>(`${environment.apiUrl}/users/${id}`, httpOption).pipe(
      tap(() => console.log(`Removed from users = ${id}`)),
      catchError(error => error)
    );
  }

  updateUser(user: User) {
    return this.http.put<User>(`${environment.apiUrl}/users/${user.id}`, user, httpOption).pipe(
      tap(() => console.log(`Changed password for = ${user.id}`)),
      catchError(error => error)
    );
  }

  addUser(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/users`, user, httpOption).pipe(
      tap((user: User) => console.log(`Added user = ${JSON.stringify(user)}`)),
      catchError(error => error)
    );
  }
}
