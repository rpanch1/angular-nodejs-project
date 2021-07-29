import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  // User to get the cart and start building the order.
  userInfo = {
    "userid": "",
    "firstname": "",
    "lastname": "",
    "email": "",
    "address": ""
  };

  // to hold address info
  newAddress = {
    "street": "",
    "city": "",
    "state": "",
    "zip": "",
  }

  // Order object
  order = {
    "user": {},
    "cart": [],
    "total": 0
  }

  loadingData: Boolean = false;

  constructor(private _userService: UserService, private _router: Router, private _authGuard: AuthGuardService) { }


  ngOnInit(): void {
    if (this._authGuard.isLoggedIn()) {
      // Get the User profile of the logged in user from mongo
      this._userService.getProfile().subscribe((result) => {
        console.log(result);
        this.userInfo.userid = result.profile._id;
        this.userInfo.firstname = result.profile.firstname;
        this.userInfo.lastname = result.profile.lastname;
        this.userInfo.email = result.profile.email;
        this.parseAddress(result.profile.address);
        this.order.cart = result.profile.cart;
        this.loadingData = true;
      });
    } else {
      this.loadingData = true
    }
  }

  // On click of order button. Compiles all of the info into the order obj and sends to db. routes to order page
  // Compiles: user info, address, and cart
  placeOrder() {
    this.userInfo.address = this.newAddress.street + ", " + this.newAddress.city + ", " + this.newAddress.state + " " + this.newAddress.zip;
    this.order.user = this.userInfo;
    this.order.total = this.getTotal();
    this._userService.placeOrder(this.order).subscribe((res) => {
      this._userService.updateProfile({cart: []}).subscribe((res) => {
        if (res.status == "success") {
          alert("Order placed successfully!");
        }
        this._router.navigate(['/orders']);
      }, (err) => (console.log(err)));
    }, (err) => console.log(err))
  }

  // Takes the string that is stored in the user address and parses into street, city, state, zip
  parseAddress(address: String) {
    // New users will not have a parseable string will just be ""
    if (address == "") {
      return;
    }
    let addrArray = address.split(/ /);
    console.log(addrArray);
    this.newAddress.street = addrArray[0].slice(0, -1);
    this.newAddress.city = addrArray[1].slice(0, -1);
    this.newAddress.state = addrArray[2];
    this.newAddress.zip = addrArray[3];
  }

  getTotal(){
    var total = 0;
    for(var i=0; i<this.order.cart.length; i++){
      total += this.order.cart[i].discountPrice;
    }
    return total;
  }

}
