import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  products = []
  cart = [];

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.getProducts().subscribe((res) => {
      this.products = res;
    }, (err) => (console.log(err)));

    this._userService.getProfile().subscribe((res) => {
      this.cart = res.profile.cart;
    }, (err) => (console.log(err)));
  }

  addToCart(product: any) {
    this.cart.push(product);
    this._userService.updateProfile({cart: this.cart}).subscribe((res) => {
      alert('product added to cart');
    }, (err) => {console.log(err)})
  }

}
