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
  topProducts = []
  cart = [];

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {

    //get param from url 
    // get prod
    // init display list using param 

    this._userService.getProducts().subscribe((res) => {
      this.products = res;
      this.setTopProducts(this.products);
    }, (err) => (console.log(err)));

    if (this.isLoggedIn()) {
      this._userService.getProfile().subscribe((res) => {
        this.cart = res.profile.cart;
      }, (err) => (console.log(err)));
    }
  }

  setTopProducts(productList) {
    this.topProducts = productList.filter((x) => { return x.isTopProduct == "true";})
    // console.log(this.topProducts);
    // console.log(this.products);
    if (this.topProducts.length > 8) {
      this.topProducts = this.topProducts.slice(0, 8);
    }
  }

  addToCart(product: any) {
    this.cart.push(product);
    this._userService.updateProfile({ cart: this.cart }).subscribe((res) => {
      alert('product added to cart');
    }, (err) => { console.log(err) })
  }

  productDetails(id: any) {
    this._router.navigate(['/product-details', id]);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('token') != null) {
      return true;
    }
    else {
      return false;
    }
  }

}
