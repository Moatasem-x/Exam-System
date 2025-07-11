import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, Output } from '@angular/core';
import { IQuestion } from '../../Interfaces/iquestion';
import { trigger, style, animate, transition, query, group } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../Services/question-service';
import { Subscription } from 'rxjs';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-question-card',
  imports: [FormsModule, SweetAlert2Module],
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
export class QuestionCard {

  constructor(private questionService:QuestionService){}

  @Input() question!:IQuestion;
  @Input() questionNumber!:number;
  @Output() deleteEmitter = new EventEmitter();
  mySub!:Subscription;
  

  isExpanded: boolean = true;

  toggleCollapse() {
    this.isExpanded = !this.isExpanded;
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
    })

  }


}
