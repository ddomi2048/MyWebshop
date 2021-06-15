import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Product } from '../product';
import { catchError, tap } from 'rxjs/operators';

const httpOption = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

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
}
