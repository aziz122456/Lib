import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from '../../services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [HttpClientTestingModule],
      providers: [UserService, { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully', () => {
    const mockUser = { userId: '1', username: 'test', email: 'test@test.com' };
    spyOn(userService, 'login').and.returnValue(of(mockUser));

    component.username = 'test';
    component.password = 'password';
    component.login();

    expect(component.successMessage).toBe(`Login successful! Welcome, ${mockUser.username}.`);
    expect(router.navigate).toHaveBeenCalledWith(['/book-search']);
  });

  it('should handle login error', () => {
    spyOn(userService, 'login').and.returnValue(throwError('Error'));

    component.login();

    expect(component.errorMessage).toBe('Login failed. Please check your credentials.');
  });
});