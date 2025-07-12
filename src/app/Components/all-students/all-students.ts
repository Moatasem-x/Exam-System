import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentCard } from "../student-card/student-card";
import { StudentService } from '../../Services/student-service';

@Component({
  selector: 'app-all-students',
  imports: [CommonModule, StudentCard],
  templateUrl: './all-students.html',
  styleUrl: './all-students.css'
})
export class AllStudents implements OnInit {
  students : any = [];
 constructor( private studentService : StudentService , private cdr : ChangeDetectorRef) { }
  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
      next : (resp) => {
        this.students = resp; 
        this.cdr.detectChanges();
      },
      error: (error) => 
      {
        console.log(error);
      }
    } );


    
  }



}
