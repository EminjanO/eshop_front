import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrUsers = environment.apiUrl + 'users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrUsers);
  }

  getUser(userId : string): Observable<User>{
    return this.http.get<User>(`${this.apiUrUsers}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrUsers}`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrUsers}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<unknown>{
    return this.http.delete<unknown>(`${this.apiUrUsers}/${userId}`);
  }
}
