import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { Scorechart } from './scorechart/scorechart';
import { Categorychart } from './categorychart/categorychart';
import { ExamService } from '../../Services/exam-service';
import { IStudentExamData } from '../../Interfaces/istudent-exam-data';

@Component({
  selector: 'app-dashboard',
  imports: [Scorechart, Categorychart, CommonModule, NgxSpinnerModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit, DoCheck, OnDestroy{
  constructor(private examService:ExamService, private cdr:ChangeDetectorRef, private spinner: NgxSpinnerService){}
  
  student = { name: localStorage.getItem("user_name") };
  stId:string = localStorage.getItem("user_id") || "";
  totalExams:number = 0;
  completedExams:number = 0;
  totalGrade:number = 0;
  studentGrade:number = 0;
  avgScore:number = 0;
  mySub:Array<Subscription> = [];
  takenExams:Array<IStudentExamData> = [];
  
  

  stats:Array<any> = [
    { title: 'Total Exams', value: this.totalExams, subtext: `${this.completedExams} completed`, color: 'text-primary' },
    { title: 'Average Score', value: `${this.avgScore}%`, subtext: 'Perfect Performance', color: 'text-success' },
  ];

  ngOnInit(): void {
    this.spinner.show();
    this.mySub.push(this.examService.getExams().subscribe({
      next: (resp) =>{
        this.totalExams = resp.length;
        this.cdr.detectChanges();
      },
      complete: ()=>{
        this.updateStats();
        this.cdr.detectChanges();
      }
    })
    );

    this.mySub.push(this.examService.getStudentTakenExams(Number(this.stId)).subscribe({
      next: (resp) => {
        this.takenExams = resp;
        this.completedExams = resp.length;
        for (let i = 0; i < resp.length; i++) {
          this.studentGrade += resp[i].studentGrade;
          if(typeof resp[i].examGrade != "undefined"){
            this.totalGrade += resp[i].examGrade || 0;
          }
        }
        this.avgScore = (this.studentGrade/this.totalGrade) * 100;
        if(isNaN(this.avgScore)) this.avgScore = 0;
        this.cdr.detectChanges();

      },
      complete: () => {
        // this.stats[1].value = this.avgScore;
        this.updateStats();
        this.cdr.detectChanges();
        setTimeout(() => {
          this.spinner.hide();
        }, 1500);
      }
    }))
  }

  ngDoCheck(): void {
    this.updateStats();
  }

  private updateStats(): void {
    this.stats = [
      { title: 'Total Exams', value: this.totalExams, subtext: `${this.completedExams} completed`, color: 'text-primary' },
      { title: 'Average Score', value: `${this.avgScore.toFixed(2)}%`, subtext: 'Perfect Performance', color: 'text-success' },
    ];
  }

  ngOnDestroy(): void {
    for (let i = 0; i < this.mySub.length; i++) {
      this.mySub[i].unsubscribe();
    }
  }
}
