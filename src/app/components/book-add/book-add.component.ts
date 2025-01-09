import { Component } from '@angular/core';
import { BookService, Book } from '../../services/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css'],
})
export class BookAddComponent {
  book: Book = {
    title: '',
    author: '',
    publisher: '',
    price: 0,
  };

  successMessage = '';
  errorMessage = '';

  constructor(private bookService: BookService) {}

  addBook(): void {
    this.bookService.addBook(this.book).subscribe({
      next: (result) => {
        this.successMessage = `Book "${result.title}" added successfully!`;
        this.errorMessage = '';
        this.book = { title: '', author: '', publisher: '', price: 0 }; // Reset form
      },
      error: (err) => {
        console.error('Add Book Error:', err);
        this.successMessage = '';
        this.errorMessage = 'Failed to add the book. Please try again.';
      },
    });
  }
}
