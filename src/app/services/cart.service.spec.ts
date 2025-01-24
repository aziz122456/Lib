import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService]
    });

    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get cart', () => {
    const userId = '12345';
    const mockCart = { cartItems: [{ bookId: '1', quantity: 1 }] };

    service.getCart(userId).subscribe(cart => {
      expect(cart).toEqual(mockCart);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCart);
  });

  it('should add to cart', () => {
    const userId = '12345';
    const bookId = '1';

    service.addToCart(userId, bookId).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/add?userId=${userId}&bookId=${bookId}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should remove from cart', () => {
    const userId = '12345';
    const bookId = '1';

    service.removeFromCart(userId, bookId).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/remove?userId=${userId}&bookId=${bookId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should checkout', () => {
    const userId = '12345';

    service.checkout(userId).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/checkout/${userId}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});