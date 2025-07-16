import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
      return true;
    }
    
    if(this.authService.isAuthenticated())
    {this.router.navigate(['/stdash']);
      return false;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authService.isStudent()) {
      return true;
    }
    if(this.authService.isAuthenticated())
    {this.router.navigate(['/admindash']);
      return false;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}