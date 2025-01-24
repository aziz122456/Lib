import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDeleteComponent } from './book-delete.component';
import { BookService } from '../../services/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('BookDeleteComponent', () => {
  let component: BookDeleteComponent;
  let fixture: ComponentFixture<BookDeleteComponent>;
  let bookService: BookService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookDeleteComponent],
      imports: [HttpClientTestingModule],
      providers: [BookService]
    }).compileComponents();

    fixture = TestBed.createComponent(BookDeleteComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a book successfully', () => {
    spyOn(bookService, 'deleteBook').and.returnValue(of());

    component.bookId = '1';
    component.deleteBook();

    expect(component.successMessage).toBe('Book deleted successfully!');
    expect(component.bookId).toBe('');
  });

  it('should handle delete book error', () => {
    spyOn(bookService, 'deleteBook').and.returnValue(throwError('Error'));

    component.deleteBook();

    expect(component.errorMessage).toBe('Failed to delete the book. Please try again.');
  });

  it('should not delete if bookId is empty', () => {
    component.bookId = '';
    component.deleteBook();

    expect(component.errorMessage).toBe('Book ID cannot be empty!');
  });
});