import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ExamSummary } from './exam-summary/exam-summary';
import { Average } from './average/average';
import { StudentService } from '../../Services/student-service';
import { ExamService } from '../../Services/exam-service';
import { StudentExamService } from '../../Services/student-exam-service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-dashboard',
  imports: [Average, ExamSummary,CommonModule, NgxSpinnerModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit, OnDestroy {
  constructor(private studentService:StudentService, private cdr:ChangeDetectorRef, private examService:ExamService, private studentExamService:StudentExamService, private spinner:NgxSpinnerService){}
  teacher = { name: localStorage.getItem("user_name") };
  mySub:Array<Subscription> = [];
  totalStudents:number = 0;
  totalExams:number = 0;
  examsGrade:number = 0;
  studentsGrade:number = 0;
  avgScore:number = 0;

  summary = [
    { title: 'Total Students', value: this.totalStudents, subtext: 'Unique participants', color: 'text-primary' },
    { title: 'Total Exams', value: this.totalExams, subtext: 'Active this month', color: 'text-success' },
    { title: 'Avg. Score', value: `${this.avgScore}%`, subtext: 'All exams', color: 'text-info' }
  ];

  exams = [
    { name: 'Math Exam', students: 20, avgScore: 76 },
    { name: 'Physics Exam', students: 18, avgScore: 83 },
    { name: 'Chemistry Exam', students: 15, avgScore: 67 }
  ];

  ngOnInit(): void {
    this.spinner.show();
    this.mySub.push(this.studentService.getStudents().subscribe({
      next: (resp) => {
        this.totalStudents = resp.length - 1;
      },
      complete: () => {
        this.updateSummary();
        this.cdr.detectChanges();

      }
    }));

    this.mySub.push(this.examService.getExams().subscribe({
      next: (resp) => {
        this.totalExams = resp.length;
      },
      complete: () => {
        this.updateSummary();
        this.cdr.detectChanges();

      }
    }));

    this.mySub.push(this.studentExamService.getStudentExamData().subscribe({
      next: (resp) => {
        for (let i = 0; i < resp.length; i++) {
          this.examsGrade += resp[i].examGrade || 0;
          this.studentsGrade += resp[i].studentGrade;
        }
        this.avgScore = (this.studentsGrade / this.examsGrade) * 100;
      },
      complete: () => {
        this.updateSummary();
        this.cdr.detectChanges();
        setTimeout(() => {
          this.spinner.hide();
        }, 1500);
      }
    }));
  }

  updateSummary(){
    this.summary = [
      { title: 'Total Students', value: this.totalStudents, subtext: 'Unique participants', color: 'text-primary' },
      { title: 'Total Exams', value: this.totalExams, subtext: 'Active this month', color: 'text-success' },
      { title: 'Avg. Score', value: `${this.avgScore.toFixed(2)}%`, subtext: 'All exams', color: 'text-info' }
    ];
  }

  ngOnDestroy(): void {
    for (let i = 0; i < this.mySub.length; i++) {
      this.mySub[i].unsubscribe();
    }
  }
}
