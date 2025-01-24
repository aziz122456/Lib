import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookSearchComponent } from './book-search.component';
import { BookService } from '../../services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let bookService: BookService;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookSearchComponent],
      imports: [HttpClientTestingModule],
      providers: [BookService, CartService]
    }).compileComponents();

    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
    cartService = TestBed.inject(CartService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for books', () => {
    const mockBooks = [{ id: '1', title: 'Book 1', author: 'Author 1', publisher: 'Publisher 1', price: 10 }];
    spyOn(bookService, 'searchBooks').and.returnValue(of(mockBooks));

    component.searchTerm = 'Book 1';
    component.search();

    expect(component.books).toEqual(mockBooks);
    expect(component.errorMessage).toBe('');
  });

  it('should handle search error', () => {
    spyOn(bookService, 'searchBooks').and.returnValue(throwError('Error'));

    component.searchTerm = 'Book 1';
    component.search();

    expect(component.errorMessage).toBe('An error occurred while searching for books.');
  });

  it('should add book to cart', () => {
    spyOn(cartService, 'addToCart').and.returnValue(of());

    component.addToCart('1');

    expect(cartService.addToCart).toHaveBeenCalledWith('12345', '1');
  });
});