import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private basicUrl = 'http://localhost:8080/api/v1';

  constructor(private _http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this._http.post(`${this.basicUrl}/users/register`, user, httpOptions);
  }

  loginUser(user: any): Observable<any> {
    return this._http.post(`${this.basicUrl}/users/login`, user, httpOptions);
  }
}
