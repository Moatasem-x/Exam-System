import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../Services/student-service';
import { IStudent } from '../../Interfaces/istudent';
import { StudentCard } from '../../Components/student-card/student-card';

@Component({
  selector: 'app-all-students',
  imports: [CommonModule, StudentCard],
  templateUrl: './all-students.html',
  styleUrl: './all-students.css'
})
export class AllStudents implements OnInit {
  students:Array<IStudent> = [];
  adminEmail:string = localStorage.getItem("user_email") || "";
  constructor( private studentService : StudentService , private cdr:ChangeDetectorRef) { }
  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
      next : (resp) => {
        this.students = resp;
        this.students = this.students.filter(st => st.email != this.adminEmail);
        this.cdr.detectChanges();
      },
      error: (error) => 
      {
        console.log(error);
      }
    } );


    
  }



}
