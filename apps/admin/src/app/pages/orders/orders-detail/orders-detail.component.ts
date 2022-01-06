import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@eshop-front/orders';
import { MessageService } from 'primeng/api';
import {ORDER_STATUS} from '../order.constants';
import { firstValueFrom, timer } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {
  order!: Order;
  orderStatuses : any = []
  selectedStatus: any;

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  private _getOrder() {
    this.route.params.subscribe(params =>{
      if(params.id){
        this.orderService.getOrder(params.id).subscribe(order => {
          this.order = order;
          this.selectedStatus = {
              id : order.status,
              name : ORDER_STATUS[order.status || 0].label
            }
        })
      }
    });
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id : key,
        name : ORDER_STATUS[key].label
      }
    });
  }

  onStatusChange(event: any){
    console.log(this.selectedStatus)
    this.orderService.updateOrder({status: event.value.id}, this.order.id).subscribe(
      {
        next : () => this.messageService.add({ severity:'success', summary:'Success', detail:`Order status is updated to ${event.value.name}!`}),
        error : (e) => this.messageService.add({ severity:'error', summary:'Error', detail:'Order Status is NOT Updated!'}),
        complete: () => firstValueFrom(timer(2000)).then(() => { this.location.back();})
      }
    );
  }

}
