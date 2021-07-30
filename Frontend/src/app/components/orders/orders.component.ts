import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  id: number;
  userid: string;
  orders = [];

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.getOrders().subscribe((res) => {
      this.orders = res.orders.reverse();
    }, (err) => console.log(err))
  }

}
