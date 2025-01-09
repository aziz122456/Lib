import { Component } from '@angular/core';
import { BookService, Book } from '../../services/book.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
})
export class BookSearchComponent {
  searchTerm = '';
  books: Book[] = [];
  errorMessage = '';

  constructor(private bookService: BookService) {}

  search(): void {
    if (!this.searchTerm.trim()) {
      this.errorMessage = 'Search term cannot be empty!';
      return;
    }

    this.bookService.searchBooks(this.searchTerm).subscribe({
      next: (result) => {
        this.books = result;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Search Error:', err);
        this.errorMessage = 'An error occurred while searching for books.';
      },
    });
  }
}
