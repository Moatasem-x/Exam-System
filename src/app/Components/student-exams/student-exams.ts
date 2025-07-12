import { Component, numberAttribute, OnInit, ChangeDetectorRef } from '@angular/core';
import { ExamService } from '../../Services/exam-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-exams',
  imports: [CommonModule, RouterLink],
  templateUrl: './student-exams.html',
  styleUrl: './student-exams.css'
})
export class StudentExams implements OnInit{
  exams: any = [];
  StudentId !: any ;
  constructor(private apiservice: ExamService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.StudentId = Number(this.route.snapshot.paramMap.get('id'));

    this.apiservice.getStudentTakenExams(this.StudentId).subscribe({
      next: (res) => {
        console.log(res);
        this.exams = res;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);

      }
    });
  }


}
