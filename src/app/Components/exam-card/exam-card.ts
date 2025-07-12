import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IExam } from '../../Interfaces/iexam';
import { ExamService } from '../../Services/exam-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-exam-card',
  imports: [RouterLink],
  templateUrl: './exam-card.html',
  styleUrl: './exam-card.css'
})
export class ExamCard implements OnInit {
  constructor(private examService:ExamService) {}
    @Input() exam!:IExam ;
  ngOnInit(): void {
    console.log(this.exam);
    this.examService.getExamById(this.exam.id).subscribe({
      next: (resp) => {
        console.log(resp);
        this.exam = resp;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
