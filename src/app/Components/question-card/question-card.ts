import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { IQuestion } from '../../Interfaces/iquestion';
import { trigger, style, animate, transition, query, group } from '@angular/animations';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionService } from '../../Services/question-service';
import { Subscription } from 'rxjs';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-question-card',
  imports: [FormsModule, SweetAlert2Module, ReactiveFormsModule],
  templateUrl: './question-card.html',
  styleUrl: './question-card.css',
  animations: [
    trigger("expand",[
      transition(":enter", [
        style({height: 0,opacity: 0}),
        query(".details",[
          style({translate: "0 -100%"})
        ]),
        group([
          animate("0.3s ease-in-out", style({height: "*", opacity: 1})),
          query(".details",[
            animate("0.3s ease-in-out", style({translate: "0 0"}))
          ])
        ])
      ]),
      transition(":leave",[
        style({height: "*", opacity: 1}),
        query(".details",[
          style({translate: "0 0"})
        ]),
        group([
          animate("0.3s ease-in-out", style({height: 0,opacity: 0})),
          query(".details",[
            animate("0.3s ease-in-out", style({translate: "0 -100%"}))
          ])
        ])
      ])
    ])
  ]
})
export class QuestionCard implements OnInit {

  constructor(private questionService:QuestionService, private cdr:ChangeDetectorRef){}
  questionAnswers:Array<string> = [];
  ngOnInit(): void {
    
    for (let i = 0; i < this.question.answers.length; i++) {
      this.questionAnswers.push(this.question.answers[i].answerText);
      
    }
    this.body.setValue(this.question.body);
    this.grade.setValue(this.question.grade.toString());
    this.answers.setValue(this.questionAnswers);
  }

  @Input() question!:IQuestion;
  @Input() questionNumber!:number;
  @Output() deleteEmitter = new EventEmitter();
  mySub!:Subscription;
  mySub2!:Subscription;
  

  isExpanded: boolean = true;

  toggleCollapse() {
    this.isExpanded = !this.isExpanded;
  }

  questionForm = new FormGroup({
    "body": new FormControl("", {nonNullable: true, validators: [Validators.required]}),
    "grade": new FormControl("", {nonNullable: true, validators: [Validators.required]}),
    "answers": new FormArray([
      new FormControl("", {nonNullable: true, validators: [Validators.required]}),
      new FormControl("", {nonNullable: true, validators: [Validators.required]}),
      new FormControl("", {nonNullable: true, validators: [Validators.required]}),
      new FormControl("", {nonNullable: true, validators: [Validators.required]})
    ])
  });

  get body(){
    return this.questionForm.controls.body;
  }

  get grade(){
    return this.questionForm.controls.grade;
  }

  get answers(){
    return this.questionForm.controls.answers;
  }

  del(){
    let qid = this.question.id;
    this.mySub = this.questionService.deleteQuestion(qid).subscribe({
        next :(resp)=>{
          Swal.fire("Success", "Deleted Successfully", "success");
          this.deleteEmitter.emit(true);
        },
        error:(err)=>{
          console.log(err);
        }
    });

  }

  editQuestion(){
    if(this.questionForm.status == "VALID") {
      this.question.body = this.body.value;
      this.question.grade = Number(this.grade.value);
      for (let i = 0; i < this.question.answers.length; i++) {
        this.question.answers[i].answerText = this.answers.value[i];
      }
      this.mySub2 = this.questionService.editQuestion(this.question, this.question.id).subscribe({
        next :(resp)=>{
          Swal.fire("Success", "Updated Successfully", "success");
          this.cdr.detectChanges();
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }


}
