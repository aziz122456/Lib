import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { UserService } from '../../services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [HttpClientTestingModule],
      providers: [UserService, { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register user successfully', () => {
    const mockUser = { userId: '1', username: 'test', email: 'test@test.com', password: 'password' };
    spyOn(userService, 'register').and.returnValue(of(mockUser));

    component.user = mockUser;
    component.register();

    expect(component.successMessage).toBe('User registered successfully!');
    expect(router.navigate).toHaveBeenCalledWith(['/book-search']);
  });

  it('should handle registration error', () => {
    spyOn(userService, 'register').and.returnValue(throwError('Error'));

    component.register();

    expect(component.errorMessage).toBe('Failed to register user. Please try again.');
  });
});