import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {

  orderList = [
    {
      "_id": "9803475iukdjsfhg",
      "user": {
        "email": "email@email",
        "address": "test address"
      },
      "cart": ["item1", "item2"],
      "orderPlacedOn": new Date(),
      "isDelivered": true,
    },
    {
      "_id": "skljdfhg948o375sdfg",
      "user": {
        "email": "email@email",
        "address": "test address"
      },
      "cart": ["item1"],
      "orderPlacedOn": new Date(),
      "isDelivered": false,
    }
  ];

  constructor(private _orderService: OrderService) { }

  ngOnInit(): void {
    // this._orderService.getOrders().subscribe((result) => {
    //   console.log(result);
    //   this.orderList = result.orders;
    // })
  }

}
