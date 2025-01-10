// Updated Angular Service for Books API
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id?: string; 
  title: string;
  author: string;
  publisher: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:5048/api/books'; 

  constructor(private http: HttpClient) {}

  // Search books
  searchBooks(term: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/search`, {
      params: { term },
    });
  }

  // Add a new book
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  // Delete a book by ID
  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get a book by ID
  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }
}
