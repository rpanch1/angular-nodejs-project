import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  newProduct = {
    name: '',
    category: '',
    price: 0,
    discountPrice: 0,
    description: '',
    image: '',
  }

  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {
  }


  onSubmit(){
    console.log(this.newProduct);
    this._adminService.addProduct(this.newProduct).subscribe((response) => {
      alert(response.message);
    }, (err) => console.log(err))
  }
}
