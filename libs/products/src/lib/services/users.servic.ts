import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrlProducts = environment.apiUrl + 'products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrlProducts);
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrlProducts, productData);
  }

  getProduct(productId : string): Observable<Product>{
    return this.http.get<Product>(`${this.apiUrlProducts}/${productId}`);
  }

  updateProduct(productData: FormData, productId : string): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrlProducts}/${productId}`, productData);
  }

  deleteProduct(productId: string): Observable<unknown>{
    return this.http.delete<unknown>(`${this.apiUrlProducts}/${productId}`);
  }

}
