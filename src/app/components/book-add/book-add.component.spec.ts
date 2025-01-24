import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookAddComponent } from './book-add.component';
import { BookService } from '../../services/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('BookAddComponent', () => {
  let component: BookAddComponent;
  let fixture: ComponentFixture<BookAddComponent>;
  let bookService: BookService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookAddComponent],
      imports: [HttpClientTestingModule],
      providers: [BookService]
    }).compileComponents();

    fixture = TestBed.createComponent(BookAddComponent);
    component = fixture.componentInstance;
    bookService = TestBed.inject(BookService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a book successfully', () => {
    const mockBook = { id: '1', title: 'Book 1', author: 'Author 1', publisher: 'Publisher 1', price: 10 };
    spyOn(bookService, 'addBook').and.returnValue(of(mockBook));

    component.book = mockBook;
    component.addBook();

    expect(component.successMessage).toBe(`Book "${mockBook.title}" added successfully!`);
    expect(component.book).toEqual({ title: '', author: '', publisher: '', price: 0 });
  });

  it('should handle add book error', () => {
    spyOn(bookService, 'addBook').and.returnValue(throwError('Error'));

    component.addBook();

    expect(component.errorMessage).toBe('Failed to add the book. Please try again.');
  });
});