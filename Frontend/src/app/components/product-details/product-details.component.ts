import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: {
    name: '',
    category: '',
    description: '',
    price: 0,
    discountPrice: 0,
    image: ''
  };

  loadingDone: Boolean = false;

  constructor(private _userService: UserService, private _router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this._userService.getProductDetails(id).subscribe((res) => {
      this.product = res;
      this.loadingDone = true;
    }, (err) => (console.log(err)))

  }

}
