import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import * as countriesLib from 'i18n-iso-countries'
import { environment } from '@env/environment';

declare const require: any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrUsers = environment.apiUrl + 'users';

  constructor(private http: HttpClient) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'))
   }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrUsers);
  }

  getUser(userId : string): Observable<User>{
    return this.http.get<User>(`${this.apiUrUsers}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    console.log(user)
    return this.http.post<User>(`${this.apiUrUsers}`, user);
  }

  updateUser(user: User): Observable<User> {
    console.log(user)
    return this.http.put<User>(`${this.apiUrUsers}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<unknown>{
    return this.http.delete<unknown>(`${this.apiUrUsers}/${userId}`);
  }

  getCountry(countryKey: string): string{
    return countriesLib.getName(countryKey, 'en');
  }

  getCountries(): {id: string, name: string}[] {
    return Object.entries(countriesLib.getNames("en", {select: "official"})).map(
      (entry)=>{
        return {
          id: entry[0],
          name: entry[1]
        }
      }
    );
  }
}
