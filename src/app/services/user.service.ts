import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  userId: string;
  username: string;
  email: string;
}

export interface LoginModel {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  login(model: LoginModel): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, model);
  }
}
