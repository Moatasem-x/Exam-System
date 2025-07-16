import { Component, numberAttribute, OnInit, ChangeDetectorRef } from '@angular/core';
import { ExamService } from '../../Services/exam-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IStudentExamData } from '../../Interfaces/istudent-exam-data';
import { TakenExamCard } from '../../Components/taken-exam-card/taken-exam-card';

@Component({
  selector: 'app-student-exams',
  imports: [CommonModule, TakenExamCard],
  templateUrl: './student-exams.html',
  styleUrl: './student-exams.css'
})
export class StudentExams implements OnInit{
  exams: Array<IStudentExamData> = [];
  StudentId!:number;
  constructor(private apiservice: ExamService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.StudentId = Number(this.route.snapshot.paramMap.get('studentID'));
    console.log(this.StudentId);
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
