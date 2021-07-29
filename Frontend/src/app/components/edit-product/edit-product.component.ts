import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  message = '';
  products: any = [];

  constructor(private _adminService: AdminService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._adminService.productInfo(this._route.snapshot.params.id).subscribe((data: {}) => {
      console.log(data);
      this.products = data;
    })
  }

  saveProductInfo() {
    this._adminService.updateProduct(this._route.snapshot.params.id, this.products).subscribe((result) => {
      this._router.navigate(['admin/products']);
      console.log(result.message);
    })
  }

}
