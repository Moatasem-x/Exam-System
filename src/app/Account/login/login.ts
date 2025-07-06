import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm = new FormGroup({
    "email": new FormControl("", [Validators.required, Validators.email]),
    "password": new FormControl("", [Validators.required])
  });

  getEmail() {
    return this.loginForm.controls.email;
  }

  getPassword() {
    return this.loginForm.controls.password;
  }

  login() {
    if(this.loginForm.status == "VALID")
    {
      console.log(this.loginForm.value);
    }
  }
}
