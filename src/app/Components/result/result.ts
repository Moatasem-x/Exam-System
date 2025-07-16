import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-result',
  imports: [RouterLink],
  templateUrl: './result.html',
  styleUrl: './result.css'
})
export class Result implements OnInit {
  grade:number = 0;
  examId!:number;
  stId:string = "";
  
 constructor(private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.grade = params['grade'];
      this.examId = params['examId'];
    });
    this.stId = localStorage.getItem("user_id") || "";
  }
  
}
