import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ExamService } from '../../Services/exam-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-students',
  imports: [CommonModule, RouterLink],
  templateUrl: './all-students.html',
  styleUrl: './all-students.css'
})
export class AllStudents implements OnInit {
  students : any = [];
 constructor( private studentservice : ExamService , private cdr : ChangeDetectorRef) { }
  ngOnInit(): void {
    this.studentservice.getAllStudents().subscribe({
      next : (res) => {
        console.log(res);
        this.students = res ; 
        this.cdr.detectChanges();
      },
      error: (error) => 
      {
        console.log(error);
      }
    } );


    
  }



}
