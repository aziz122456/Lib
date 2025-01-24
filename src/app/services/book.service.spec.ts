import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { Book } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });

    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search books', () => {
    const mockBooks: Book[] = [{ id: '1', title: 'Book 1', author: 'Author 1', publisher: 'Publisher 1', price: 10 }];
    const searchTerm = 'Book 1';

    service.searchBooks(searchTerm).subscribe(books => {
      expect(books).toEqual(mockBooks);
    });

    // Expect a request to the encoded URL
    const req = httpMock.expectOne(`${service['apiUrl']}/search?term=Book%201`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks); // Provide mock data as the response
  });

  it('should add a book', () => {
    const mockBook: Book = { title: 'Book 1', author: 'Author 1', publisher: 'Publisher 1', price: 10 };

    service.addBook(mockBook).subscribe(book => {
      expect(book).toEqual(mockBook);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    req.flush(mockBook);
  });

  it('should delete a book', () => {
    const bookId = '1';

    service.deleteBook(bookId).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${bookId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should get a book by ID', () => {
    const mockBook: Book = { id: '1', title: 'Book 1', author: 'Author 1', publisher: 'Publisher 1', price: 10 };
    const bookId = '1';

    service.getBookById(bookId).subscribe(book => {
      expect(book).toEqual(mockBook);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${bookId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBook);
  });
});