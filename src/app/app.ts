import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./Components/navbar/navbar";
import { Register } from "./Account/register/register";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Register],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'exam';
}
