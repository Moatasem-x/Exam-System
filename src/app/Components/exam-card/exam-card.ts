import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IExam } from '../../Interfaces/iexam';
import { ExamService } from '../../Services/exam-service';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-exam-card',
  imports: [RouterLink, SweetAlert2Module],
  templateUrl: './exam-card.html',
  styleUrl: './exam-card.css'
})
export class ExamCard implements OnInit {
  constructor(private examService:ExamService) {}
  @Input() exam!:IExam ;
  studentId!: string ;
  userRole!:string;
  examId!:number;
  mySub!:Subscription;
  @Output() deleteEmitter = new EventEmitter();


  ngOnInit(): void {
    this.examId = this.exam.id;
    this.studentId = localStorage.getItem('user_id') || '';
    this.userRole = localStorage.getItem("user_role") || "";
    this.examService.getExamById(this.exam.id).subscribe({
      next: (resp) => {
        this.exam = resp;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteExam() {
    console.log(this.examId);
    this.mySub = this.examService.deleteExam(this.examId).subscribe({
      next: (resp) => {
        Swal.fire("Success", "Deleted Successfully", "success");
        this.deleteEmitter.emit(this.examId);
      }
    })
  }


}
