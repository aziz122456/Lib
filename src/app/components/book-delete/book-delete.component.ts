import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css'],
})
export class BookDeleteComponent {
  bookId = '';
  successMessage = '';
  errorMessage = '';

  constructor(private bookService: BookService) {}

  deleteBook(): void {
    if (!this.bookId.trim()) {
      this.errorMessage = 'Book ID cannot be empty!';
      return;
    }

    this.bookService.deleteBook(this.bookId).subscribe({
      next: () => {
        this.successMessage = 'Book deleted successfully!';
        this.errorMessage = '';
        this.bookId = '';
      },
      error: (err) => {
        console.error('Delete Error:', err);
        this.successMessage = '';
        this.errorMessage = 'Failed to delete the book. Please try again.';
      },
    });
  }
}
