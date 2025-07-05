import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm = new FormGroup({
    "name": new FormControl("", [Validators.required]),
    "email": new FormControl("", [Validators.required, Validators.email]),
    "address": new FormControl("", [Validators.required]),
    "password": new FormControl("", [Validators.required])
  })

}
