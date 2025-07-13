import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    console.log('Intercepting request to add JWT token');
    
    if (token) {
        console.log('Adding Authorization header with token:', token);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
          
        }
      });
      console.log('No token found, proceeding without Authorization header');
      return next.handle(request);
    }

    else
    {
            return next.handle(request);    
        // If no token is found, proceed without adding Authorization header   
       
    }

    
  }
}