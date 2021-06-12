import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Product } from '../product';

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

  getAllCart() {
    return this.http.get<Product[]>(`${environment.apiUrl}/cart`, httpOption);
  }
}
