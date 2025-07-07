import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./Components/navbar/navbar";
import { Register } from "./Account/register/register";
import { CommonModule } from '@angular/common';
import { Dashboard } from "./Components/dashboard/dashboard";
import { AdminDashboard } from "./Components/admin-dashboard/admin-dashboard";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Register, CommonModule, Dashboard, AdminDashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'exam';
}
