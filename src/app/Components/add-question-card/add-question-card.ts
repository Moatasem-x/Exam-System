import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { IQuestion } from '../../Interfaces/iquestion';
import { Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionService } from '../../Services/question-service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question-card',
  imports: [ReactiveFormsModule, SweetAlert2Module],
  templateUrl: './add-question-card.html',
  styleUrl: './add-question-card.css'
})
export class EditQuestionCard {

  constructor(private questionService:QuestionService, private cdr:ChangeDetectorRef){}

  @Input() question!:IQuestion;
  @Output() addedQuestionEmitter = new EventEmitter();
  mySub!:Subscription;

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

  addQuestion(){
      if(this.questionForm.status == "VALID") {
        this.question.body = this.body.value;
        this.question.grade = Number(this.grade.value);
        for (let i = 0; i < this.question.answers.length; i++) {
          this.question.answers[i].answerText = this.answers.value[i];
        }
        this.mySub = this.questionService.addQuestion(this.question).subscribe({
          next :(resp)=>{
            Swal.fire("Success", "Added Successfully", "success");
            this.cdr.detectChanges();
            this.addedQuestionEmitter.emit(resp);
          },
          error:(err)=>{
            console.log(err);
          }
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please Fill All The Fields",
        });
      }
  }

  

}
