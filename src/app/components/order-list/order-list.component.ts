import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  userId: string = ''; // Replace with logic to fetch userId
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.userId = '12345'; // Replace with actual user ID retrieval
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getUserOrders(this.userId).subscribe((orders) => {
      this.orders = orders;
    });
  }
}
