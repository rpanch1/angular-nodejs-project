import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

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

  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {
    // this._adminService.getOrders().subscribe((result) => {
    //   console.log(result);
    //   this.orderList = result.orders;
    // });
    this.orderList.sort((x,y) => (x.isDelivered === y.isDelivered)? 0 : x.isDelivered ? 1 : -1)
    console.log(this.orderList);
  }

  processOrder() {
    console.log("Processing Order");
  }

  deleteOrder() {
    console.log("Delete Order");
  }

}
