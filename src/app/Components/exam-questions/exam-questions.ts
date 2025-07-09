import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IExam } from '../../Interfaces/iexam';
import { IQuestion } from '../../Interfaces/iquestion';
import { FormsModule } from '@angular/forms';
import { INewQ } from '../../Interfaces/INewQ';

@Component({
  selector: 'app-exam-questions',
  imports: [HttpClientModule,FormsModule],
  templateUrl: './exam-questions.html',
  styleUrl: './exam-questions.css'
})
export class ExamQuestions implements OnInit {


constructor(private active:ActivatedRoute , private cdr:ChangeDetectorRef , private http:HttpClient ) {}

examid:number=0;
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

//Create Array of IQestion for new questions added to the exam
// in html loop over new array and questions coming form the DB 
// When user clicks save loop over each array individually 
// update the existing questions 
// and add new questions 
// delete will delete the question and it's can't be undone 
  ngOnInit(): void {

     this.active.params.subscribe(params=>{
      this.examid = params['id'];
      this.baseurl = `https://localhost:7191/api/Exam/${this.examid}`;
      this.mySub = this.http.get<IExam>(this.baseurl).subscribe({
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
      this.mySub = this.http.put(`https://localhost:7191/api/Question/${element.id}`,element).subscribe({
        next :(resp)=>{
          console.log(resp);
        },
        error:(err)=>{
          console.log(err);
        }
      })
    });
    
    this.newQs.forEach(element => {

      this.mySub = this.http.post(`https://localhost:7191/api/Question`,element).subscribe({
        next :(resp)=>{
          console.log(resp);
          location.reload();
        },
        error:(err)=>{
          console.log(err);
        }
      })

    });

// location.reload();
  }

  del(index:number){
    let qid = this.allQs[index].id;
          this.mySub = this.http.delete(`https://localhost:7191/api/Question/${qid}`).subscribe({
        next :(resp)=>{
          console.log(resp);
          location.reload();
        },
        error:(err)=>{
          console.log(err);
        }
      })

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

}
