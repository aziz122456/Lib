import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5000/api/cart'; // Adjust base URL as needed

  constructor(private http: HttpClient) {}

  getCart(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  addToCart(userId: string, bookId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add`, null, {
      params: { userId, bookId }
    });
  }

  removeFromCart(userId: string, bookId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove`, {
      params: { userId, bookId }
    });
  }

  checkout(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout/${userId}`, null);
  }
}
