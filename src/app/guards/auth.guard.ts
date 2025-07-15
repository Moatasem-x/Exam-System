import { inject, Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
    console.log("Constructor");

  }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      console.log("Auth");
      return true;
    }
    console.log("Not Auth");
    this.router.navigate(['/login']);
    return false;
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
    
    this.router.navigate(['/login']);
    return false;
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
    
    this.router.navigate(['/login']);
    return false;
  }
}