import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartListComponent } from './cart-list.component';
import { CartService } from 'src/app/services/cart.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('CartListComponent', () => {
  let component: CartListComponent;
  let fixture: ComponentFixture<CartListComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartListComponent],
      imports: [HttpClientTestingModule],
      providers: [CartService]
    }).compileComponents();

    fixture = TestBed.createComponent(CartListComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cart items', () => {
    const mockCart = { cartItems: [{ bookId: '1', quantity: 1 }] };
    spyOn(cartService, 'getCart').and.returnValue(of(mockCart));

    component.loadCart();

    expect(component.cartItems).toEqual(mockCart.cartItems);
  });

  it('should remove item from cart', () => {
    spyOn(cartService, 'removeFromCart').and.returnValue(of());

    component.removeItem('1');

    expect(cartService.removeFromCart).toHaveBeenCalledWith('12345', '1');
  });

  it('should checkout', () => {
    spyOn(cartService, 'checkout').and.returnValue(of());

    component.checkout();

    expect(cartService.checkout).toHaveBeenCalledWith('12345');
  });
});