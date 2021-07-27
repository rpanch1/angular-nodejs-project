import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _userService: UserService) { }

  cart = [];
  total: number = 0;

  ngOnInit(): void {
    this._userService.getProfile().subscribe((res) => {
      this.cart = res.profile.cart;
      this.getTotal();
    }, (err) => (console.log(err)));
  }

  removeFromCart(index: number){
    this.cart.splice(index, 1);
    this.getTotal();
    this._userService.updateProfile({cart: this.cart}).subscribe((res) => {
      alert('Product Removed');
    }, (err) => {console.log(err)});
  }

  checkout(){
    
  }

  getTotal(){
    this.total = 0;
    for(var i=0; i<this.cart.length; i++){
      this.total += this.cart[i].discountPrice;
    }
  }


}
