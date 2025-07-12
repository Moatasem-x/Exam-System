import { Component, numberAttribute, OnInit, ChangeDetectorRef } from '@angular/core';
import { ExamService } from '../../Services/exam-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TakenExamCard } from "../taken-exam-card/taken-exam-card";
import { IStudentExamData } from '../../Interfaces/istudent-exam-data';

@Component({
  selector: 'app-student-exams',
  imports: [CommonModule, TakenExamCard],
  templateUrl: './student-exams.html',
  styleUrl: './student-exams.css'
})
export class StudentExams implements OnInit{
  exams: Array<IStudentExamData> = [];
  id !: any
  constructor(private apiservice: ExamService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.apiservice.getStudentTakenExams(this.id).subscribe({
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
