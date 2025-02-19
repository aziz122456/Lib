import { Component } from '@angular/core';
import { UserService, LoginModel } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private userService: UserService , private router: Router) {}

  login(): void {
    const loginModel: LoginModel = {
      username: this.username,
      password: this.password,
    };

    this.userService.login(loginModel).subscribe({
      next: (user) => {
        this.successMessage = `Login successful! Welcome, ${user.username}.`;
        this.errorMessage = ''; // Clear error message
        this.router.navigate(['/book-search']); 
      },
      error: (err) => {
        this.successMessage = ''; // Clear success message
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login Error:', err);
      },
    });
  }
}
