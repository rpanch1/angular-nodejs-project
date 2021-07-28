import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private basicUrl = 'http://localhost:8080/api/v1';

  constructor(private _httpClient: HttpClient) { }

  getOrders(): Observable<any> {
    return this._httpClient.get(`${this.basicUrl}/orders`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  
}
