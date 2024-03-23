import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/user/';
  };

  addUser(user: User): Observable<any> {
    return this.http.post<any>(this.myAppUrl + this.myApiUrl, user);
  }

  authenticateUser(credentials: { userName: string, password: string }): Observable<User> {
    return this.http.post<User>(this.myAppUrl + this.myApiUrl + 'authenticate', credentials);
  } 

  getListUsers(): Observable<User[]> {
    return this.http.get<any[]>(`${this.myAppUrl}${this.myApiUrl}`).pipe(
        map((data: any[]) => data as User[])
    );
  }

  deleteUser(id: Number): Observable<void>  {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  };

  getUser(id: number): Observable<User>{
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateUser(id: number, user: User): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, user);
  }
}