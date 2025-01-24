import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService]
    });

    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should place an order', () => {
    const userId = '12345';

    service.placeOrder(userId).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/place/${userId}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should get user orders', () => {
    const userId = '12345';
    const mockOrders = [{ orderId: '1', userId: '12345', items: [] }];

    service.getUserOrders(userId).subscribe(orders => {
      expect(orders).toEqual(mockOrders);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/user/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
  });

  it('should get order by ID', () => {
    const orderId = '1';
    const mockOrder = { orderId: '1', userId: '12345', items: [] };

    service.getOrderById(orderId).subscribe(order => {
      expect(order).toEqual(mockOrder);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${orderId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrder);
  });

  it('should update order status', () => {
    const orderId = '1';
    const status = 'Shipped';

    service.updateOrderStatus(orderId, status).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${orderId}/status?status=${status}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });
});