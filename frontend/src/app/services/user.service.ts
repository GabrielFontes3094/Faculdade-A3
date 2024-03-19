import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
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

  authenticateUser(credentials: { userName: string, password: string }): Observable<any> {
    return this.http.post<any>(this.myAppUrl + this.myApiUrl + 'authenticate', credentials);
  }
}