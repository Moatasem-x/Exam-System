import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IQuestion } from '../../Interfaces/iquestion';
import { FormsModule } from '@angular/forms';
import { ExamService } from '../../Services/exam-service';
import { QuestionService } from '../../Services/question-service';
import { CommonModule } from '@angular/common';
import { QuestionCard } from "../question-card/question-card";
import { EditQuestionCard } from "../add-question-card/add-question-card";


@Component({
  selector: 'app-exam-questions',
  imports: [CommonModule, FormsModule, QuestionCard, EditQuestionCard],
  templateUrl: './exam-questions.html',
  styleUrl: './exam-questions.css',
})
export class ExamQuestions implements OnInit {


constructor(private active:ActivatedRoute , private cdr:ChangeDetectorRef , private http:HttpClient, private examService:ExamService, private questionService:QuestionService ) {}

examId!:number;
baseurl:string = "";
mySub!:Subscription;
allQs:IQuestion[]=[];
emptyQ:IQuestion = {
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
newQs:IQuestion[] = []; 
addedQuestion!:IQuestion;

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(){
    this.active.params.subscribe(params=>{
      this.examId = params['id'];
      this.mySub = this.examService.getExamById(this.examId).subscribe({
        next :(resp)=>{
          this.allQs = resp.question;
          this.cdr.detectChanges();
        },
        error:(err)=>{
          console.log(err);
        }
      })
    })
  }

  AddEmptyQuestion(){
    let q = this.deepcopy(this.emptyQ);
    q.examId = this.examId;
    this.newQs.push(q);
  }


  deepcopy(q: IQuestion): IQuestion {
  return {
    ...q,
    answers: q.answers.map(a => ({ ...a }))
  };
  }

  updateQuestions(qid:number) {
    this.allQs = this.allQs.filter(item => item.id != qid);
  }

  addNewQuestion(q:IQuestion){
    this.newQs.splice(this.newQs.indexOf(q), 1);
    this.loadQuestions();
  }
      

}

