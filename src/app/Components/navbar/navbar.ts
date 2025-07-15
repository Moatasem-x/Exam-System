import { Component, DoCheck, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, DoCheck {
  constructor(private authService:AuthService){}
  ngDoCheck(): void {
    if (typeof window !== 'undefined' && localStorage.getItem("jwt_token")) {
    this.isAuth = this.authService.isAuthenticated();
    this.userRole = localStorage.getItem("user_role") || "";
    this.stId = localStorage.getItem("user_id") || "";}

  }
  isAuth:boolean = false;
  userRole!:string;
  stId:string = "";
  
  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage.getItem("jwt_token")) {
    this.isAuth = this.authService.isAuthenticated();
    this.userRole = localStorage.getItem("user_role") || "";
    this.stId = localStorage.getItem("user_id") || "";}

  }

  logout(){
    this.authService.logout();
  }

}
