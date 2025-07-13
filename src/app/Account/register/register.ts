import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { RegisterRequest } from '../../models/auth.models';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  constructor(private router: Router, private authService: AuthService) {}

  registerForm = new FormGroup({
    "name": new FormControl("", [Validators.required]),
    "email": new FormControl("", [Validators.required, Validators.email]),
    "address": new FormControl("", [Validators.required]),
    "password": new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]),
    "confirmPassword": new FormControl("", [Validators.required])
  });

  getName() {
    return this.registerForm.controls.name;
  }

  getEmail() {
    return this.registerForm.controls.email;
  }

  getPassword() {
    return this.registerForm.controls.password;
  }

  getConfirmPassword() {
    return this.registerForm.controls.confirmPassword;
  }

  getAddress() {
    return this.registerForm.controls.address;
  }

  register() {
    if (this.registerForm.status == "VALID" && this.getPassword().value == this.getConfirmPassword().value) {
      const nameParts = this.getName().value!.split(' ');
      const registerData: RegisterRequest = {
        email: this.getEmail().value!,
        password: this.getPassword().value!,
        firstName: nameParts[0],
        lastName: nameParts.slice(1).join(' ') || nameParts[0],
        address: this.getAddress().value!
      };

      this.authService.register(registerData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          // Auto-login after registration
          const loginData = {
            email: registerData.email,
            password: registerData.password
          };
          this.authService.login(loginData).subscribe({
            next: (loginResponse) => {
              if (loginResponse.role === 'Admin') {
                this.router.navigate(['/admindash']);
              } else {
                this.router.navigate(['/stdash']);
              }
            },
            error: (loginError) => {
              console.error('Auto-login failed:', loginError);
              this.router.navigate(['/login']);
            }
          });
        },
        error: (error) => {
          console.error('Registration failed:', error);
          // Handle error (show message to user)
        }
      });
    }
  }
}