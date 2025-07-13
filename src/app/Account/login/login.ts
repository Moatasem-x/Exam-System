import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { LoginRequest } from '../../models/auth.models';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm = new FormGroup({
    "email": new FormControl("", [Validators.required, Validators.email]),
    "password": new FormControl("", [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router) {}

  getEmail() {
    return this.loginForm.controls.email;
  }

  getPassword() {
    return this.loginForm.controls.password;
  }

  login() {
    if (this.loginForm.status == "VALID") {
      const loginData: LoginRequest = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      };

      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // Redirect based on role
          if (response.role === 'Admin') {
            this.router.navigate(['/admindash']);
          } else {
            this.router.navigate(['/stdash']);
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Handle error (show message to user)
        }
      });
    }
  }
}