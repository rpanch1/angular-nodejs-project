import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  products = []
  cart = [];

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    this._userService.getProducts().subscribe((res) => {
      this.products = res;
    }, (err) => (console.log(err)));

    if(this.isLoggedIn()){
      this._userService.getProfile().subscribe((res) => {
        this.cart = res.profile.cart;
      }, (err) => (console.log(err)));
    }
  }

  addToCart(product: any) {
    this.cart.push(product);
    this._userService.updateProfile({cart: this.cart}).subscribe((res) => {
      alert('product added to cart');
    }, (err) => {console.log(err)})
  }

  productDetails(id: any){
    this._router.navigate(['/product-details', id]);
  }

  isLoggedIn(): boolean{
    if(localStorage.getItem('token') != null){
      return true;
    }
    else{
      return false;
    }
  }

}
