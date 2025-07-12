import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-result',
  imports: [],
  templateUrl: './result.html',
  styleUrl: './result.css'
})
export class Result {
  grade:number = 0;
  
 constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.grade = nav?.extras.state?.['grade'] ?? 0;
  }
}
