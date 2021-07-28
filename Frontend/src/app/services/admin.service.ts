import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${localStorage.getItem('token')}`
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private basicUrl = 'http://localhost:8080/api/v1';

  constructor(private _http: HttpClient) { }

  // used by admin account to add new products
  addProduct(product: any): Observable<any>{
    return this._http.post(`${this.basicUrl}/admin/products`, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // used to display all orders
  getOrders(): Observable<any>{
    return this._http.get(`${this.basicUrl}/orders/all`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  
  // used to display all users from database
  getUsers(): Observable<any>{
    return this._http.get(`${this.basicUrl}/admin/users`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }


  // used by admin to remove a user
  removeUser(userid: any): Observable<any>{
    return this._http.delete(`${this.basicUrl}/admin/users/${userid}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // used by admin to add a user
  addUser(user: any): Observable<any>{
    return this._http.post(`${this.basicUrl}/admin/add-user`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

}
