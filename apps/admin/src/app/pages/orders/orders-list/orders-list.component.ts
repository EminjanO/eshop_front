import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@eshop-front/orders';


const ORDER_STATUS : any = {
  0 : {
    label: 'Pending',
    color: 'primary'
  },
  1: {
    label: 'Processed',
    color: 'warning'
  },
  2: {
    label: 'Shipping',
    color: 'warning'
  },
  3 : {
    label: 'Delivered',
    color: 'success'
  },
  4: {
    label: 'Failed',
    color: 'danger'
  }
}

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];
  orderStatus = ORDER_STATUS;

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this._getOrders();
  }
  private _getOrders() {
    this.ordersService.getOrders().subscribe((o) => this.orders = o);
  }

  deleteOrder(orderId: string){}
  showOrder(orderId: string ){}

}
