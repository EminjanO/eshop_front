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

  // getProduct(productId : string): Observable<Product>{
  //   return this.http.get<Product>(`${this.apiUrlProducts}/${productId}`);
  // }

  createProduct(productData: FormData): Observable<Product> {
    console.log(productData.get('name'), 'oh lala')
    return this.http.post<Product>(this.apiUrlProducts, productData);
  }

  // updateProduct(product: Product): Observable<Product> {
  //   return this.http.put<Product>(`${this.apiUrlProducts}/${product.id}`, product);
  // }

  // deleteProduct(productId: string): Observable<unknown>{
  //   return this.http.delete<unknown>(`${this.apiUrlProducts}/${productId}`);
  // }

}
