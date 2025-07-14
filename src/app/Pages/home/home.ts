import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  constructor(private authService:AuthService){}
  ngDoCheck(): void {
    this.isAuth = this.authService.isAuthenticated();
  }
  isAuth:boolean = false;
  userRole!:string;
    

}
