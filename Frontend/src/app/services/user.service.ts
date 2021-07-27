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

  // used for registering new users
  registerUser(user: any): Observable<any> {
    return this._http.post(`${this.basicUrl}/users/register`, user, httpOptions);
  }

  // used for loggin in
  loginUser(user: any): Observable<any> {
    return this._http.post(`${this.basicUrl}/users/login`, user, httpOptions);
  }

  updateProfile(user: any): Observable<any> {
    return this._http.put(`${this.basicUrl}/profile/update`, user, httpOptions);
  
  // used for getting logged in users saved information
  getProfile(): Observable<any>{
    return this._http.post(`${this.basicUrl}/profile`, {}, httpOptions);
  }

  // only used when loggin in - usesr token is passed in param since its not yet stored in localstorage before logged in
  getUserRole(token: string): Observable<any>{
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
    return this._http.post(`${this.basicUrl}/profile`, {}, header);
  }
}
