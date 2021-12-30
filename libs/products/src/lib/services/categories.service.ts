import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiUrlProducts = environment.apiUrl + 'categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrlProducts);
  }

  getCategory(categoryId : string): Observable<Category>{
    return this.http.get<Category>(`${this.apiUrlProducts}/${categoryId}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrlProducts}`, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrlProducts}/${category.id}`, category);
  }

  deleteCategory(categoryId: string): Observable<unknown>{
    return this.http.delete<unknown>(`${this.apiUrlProducts}/${categoryId}`);
  }
}
