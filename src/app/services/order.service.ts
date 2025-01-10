import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5048/api/orders'; // Adjust base URL as needed

  constructor(private http: HttpClient) {}

  placeOrder(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/place/${userId}`, null);
  }

  getUserOrders(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  getOrderById(orderId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${orderId}`);
  }

  updateOrderStatus(orderId: string, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${orderId}/status`, null, {
      params: { status }
    });
  }
}
