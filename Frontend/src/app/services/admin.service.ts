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
export class AdminService {

  private basicUrl = 'http://localhost:8080/api/v1';

  constructor(private _http: HttpClient) { }

  // used by admin account to add new products
  addProduct(product: any): Observable<any>{
    return this._http.post(`${this.basicUrl}/admin/products`, product, httpOptions);
  }


}
