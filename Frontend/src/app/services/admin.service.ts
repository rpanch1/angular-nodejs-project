import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private basicUrl = 'http://localhost:8080/api/v1';

  constructor(private _http: HttpClient) { }

  // used by admin account to add new products
  addProduct(product: any): Observable<any> {
    return this._http.post(`${this.basicUrl}/admin/products`, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // used to display all orders
  getOrders(): Observable<any> {
    return this._http.get(`${this.basicUrl}/orders/all`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // Delete Order as admin
  deleteOrder(id): Observable<any> {
    return this._http.delete(`${this.basicUrl}/orders/` + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  // Mark order as processed aka isDelivered = true
  processOrder(order): Observable<any> {
    return this._http.put(`${this.basicUrl}/orders/` + order._id, order, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

}
