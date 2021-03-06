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
  order;

  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {
    this._adminService.getOrders().subscribe((result) => {
      console.log(result);
      this.orderList = result.orders;
      this.orderList.sort((x, y) => (x.isDelivered === y.isDelivered) ? 0 : x.isDelivered ? 1 : -1);
      console.log(this.orderList);
    });

  }

  processOrder() {
    this.order.isDelivered = true;
    console.log("Processing Order: " + this.order._id);
    this._adminService.processOrder(this.order).subscribe((result) => {
      console.log(result);
      window.location.reload();
    })
  }

  deleteOrder() {
    console.log("Delete Order: " + this.order._id);
    this._adminService.deleteOrder(this.order._id).subscribe((result) => {
      console.log(result);
      window.location.reload();
    });
  }

  getOrder(order) {
    this.order = order;
  }

}
