import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  products: any = [];

  constructor(private _adminService: AdminService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._adminService.manageProduct().subscribe((response) => {
      console.log(response);
      this.products = response;
    });
  }

  deleteProduct(id: any, index: any) {
    this._adminService.removeProduct(id).subscribe((response) => {
      this.products.splice(index, 1);
      alert("Product deleted successfully!");
    }, (error) => {
      console.log(error);
    })
  }

}
