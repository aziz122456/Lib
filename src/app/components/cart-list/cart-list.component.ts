import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  userId: string = ''; // Replace with logic to fetch userId
  cartItems: any[] = [];

  constructor(private cartService: CartService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = '12345'; // Replace with actual user ID retrieval
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart(this.userId).subscribe((cart) => {
      this.cartItems = cart.cartItems;
    });
  }

  removeItem(bookId: string): void {
    this.cartService.removeFromCart(this.userId, bookId).subscribe(() => {
      this.loadCart();
    });
  }

  checkout(): void {
    this.cartService.checkout(this.userId).subscribe(() => {
      alert('Checkout successful');
      this.loadCart();
    });
  }
}
