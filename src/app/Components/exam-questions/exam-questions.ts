import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IExam } from '../../Interfaces/iexam';
import { IQuestion } from '../../Interfaces/iquestion';
import { FormsModule } from '@angular/forms';
import { INewQ } from '../../Interfaces/INewQ';
import { ExamService } from '../../Services/exam-service';
import { QuestionService } from '../../Services/question-service';
import { CommonModule } from '@angular/common';
import { QuestionCard } from "../question-card/question-card";


@Component({
  selector: 'app-exam-questions',
  imports: [CommonModule, FormsModule, QuestionCard],
  templateUrl: './exam-questions.html',
  styleUrl: './exam-questions.css',
})
export class ExamQuestions implements OnInit {


constructor(private active:ActivatedRoute , private cdr:ChangeDetectorRef , private http:HttpClient, private examService:ExamService, private questionService:QuestionService ) {}

examid!:number;
baseurl:string = "";
mySub!:Subscription;
allQs:IQuestion[]=[];
emptyQ:INewQ = {
      examId:0,
      type:"",
      body:"",
      grade:0,
      answers:[
        {
          answerText: "",
          isCorrect: true,
        },{
          answerText: "",
          isCorrect: false,
        },
        {
          answerText: "", 
          isCorrect:false
        },
        {
          answerText: "", 
          isCorrect:false
        }
      ]
}
newQs:INewQ[] = []; 

  ngOnInit(): void {

    this.active.params.subscribe(params=>{
      this.examid = params['id'];
      this.mySub = this.examService.getExamById(this.examid).subscribe({
        next :(resp)=>{
          this.allQs = resp.question;
          console.log(this.allQs);
          this.cdr.detectChanges();
        },
        error:(err)=>{
          console.log(err);
        }
      })
    })
  
  }

  savetoDB(){

    this.allQs.forEach(element => {
      this.mySub = this.questionService.editQuestion(element, element.id).subscribe({
        next :(resp)=>{
          console.log(resp);
        },
        error:(err)=>{
          console.log(err);
        }
      })
    });
    
    this.newQs.forEach(element => {

      this.mySub = this.questionService.addQuestion(element).subscribe({
        next :(resp)=>{
          console.log(resp);
          location.reload();
        },
        error:(err)=>{
          console.log(err);
        }
      })

    });

  }

  AddnewQ(){
    let q = this.deepcopy(this.emptyQ);
    q.examId = this.examid;
    this.newQs.push(q);
  }


  deepcopy(q: INewQ): INewQ {
  return {
    ...q,
    answers: q.answers.map(a => ({ ...a }))
  };
  }

  updateQuestions(flag:boolean) {
    if (flag) {
      this.active.params.subscribe(params=>{
        this.examid = params['id'];
        this.mySub = this.examService.getExamById(this.examid).subscribe({
          next :(resp)=>{
            this.allQs = resp.question;
            console.log(this.allQs);
            this.cdr.detectChanges();
          },
          error:(err)=>{
            console.log(err);
          }
        })
      })
    }
  }
      

}

