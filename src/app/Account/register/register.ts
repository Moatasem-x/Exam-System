import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  constructor(private router: Router) {}

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
    if(this.registerForm.status == "VALID" && this.getPassword().value == this.getConfirmPassword().value)
    {
      console.log(this.registerForm.value);
      this.router.navigateByUrl("/login");
    }
  }

}
