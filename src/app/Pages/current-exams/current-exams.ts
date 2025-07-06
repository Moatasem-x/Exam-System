import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IExam } from '../../Interfaces/iexam';
import { ExamService } from '../../Services/exam-service';
import { ExamCard } from "../../Components/exam-card/exam-card";

@Component({
  selector: 'app-current-exams',
  imports: [ExamCard],
  templateUrl: './current-exams.html',
  styleUrl: './current-exams.css'
})
export class CurrentExams {
  mySub1!: Subscription;
  baseUrl: string = 'https://localhost:7191/api/Student/1/available';
  baseUrl2: string = 'https://localhost:7191/api/StudentAnswer';
  protected title = 'website';
  constructor(private examService:ExamService, private cdr:ChangeDetectorRef, private activatedRoute:ActivatedRoute) {}
  exams:Array<IExam>=[];
  ngOnInit(): void {

    this.mySub1 = this.examService.getExams().subscribe({
      next:(resp)=>{
        this.exams=resp;
        this.cdr.detectChanges();
      },
      error:(error)=>{
        console.log(error);
      }
    });
  
  }
 
  gotoExam(){

  }

}
