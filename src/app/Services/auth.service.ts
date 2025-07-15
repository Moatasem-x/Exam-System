import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://localhost:7032/api/auth'; // Update with your API URL
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly USER_KEY = 'user_data';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {   
    this.loadUserFromStorage();
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    console.log(data);
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, data)
      .pipe(
        tap(response => this.handleAuthSuccess(response))
      );
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, data)
      .pipe(
        tap(response => this.handleAuthSuccess(response))
      );
  }

  logout() {
    this.handleLogout();
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/me`);
  }

  private handleAuthSuccess(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    const user: User = {
      id: response.studentId?.toString() || '', // Will be set when we get user details
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      role: response.role
    };
    // localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
    localStorage.setItem('user_id', user.id); // Store user ID for easy access
    localStorage.setItem('user_role', user.role); // Store user role for easy access
    localStorage.setItem('user_email', user.email); // Store user email for easy access
    localStorage.setItem('user_name', `${user.firstName}`); // Store user full name for easy access

  }

  private handleLogout(): void {
    // localStorage.removeItem(this.TOKEN_KEY);
    // localStorage.removeItem(this.USER_KEY);
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

  private loadUserFromStorage(): void {
    if(typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem(this.TOKEN_KEY);
      const userData = localStorage.getItem(this.USER_KEY);
    }

  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    console.log(typeof window);
    if (typeof window !== 'undefined' && localStorage.getItem(`${this.TOKEN_KEY}`)) {
    const token = this.getToken();
    if (!token) return false;
    return true; 
  }
  // console.log("NOT AUTH")
  return false;
  }

  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const user = localStorage.getItem('user_role');
    return user === 'Admin';
  }

  isStudent(): boolean {
    const user = localStorage.getItem('user_role');
    return user === 'Student';
  }
}