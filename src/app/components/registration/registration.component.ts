// registration.component.ts
import { Component } from '@angular/core';
import { UserService ,User } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  user: User = {
    userId: '',
    username: '',
    email: '',
    password: '',
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService , private router: Router) {}

  register(): void {
    this.userService.register(this.user).subscribe(
      (response) => {
        this.successMessage = 'User registered successfully!';
        this.errorMessage = '';
        this.resetForm();
        this.router.navigate(['/book-search']); // Redirect to Book Search
      },
      (error) => {
        this.errorMessage = 'Failed to register user. Please try again.';
        this.successMessage = '';
      }
    );
  }

  resetForm(): void {
    this.user = {
      userId: '',
      username: '',
      email: '',
      password: '',
    };
  }
}
