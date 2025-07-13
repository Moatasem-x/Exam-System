import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuestion } from '../../Interfaces/iquestion';
import { IExam } from '../../Interfaces/iexam';
import { StudentExamService } from '../../Services/student-exam-service';
import { IStudentExamData } from '../../Interfaces/istudent-exam-data';
import { StudentTakeExamService } from '../../Services/student-take-exam-service';
import { IStudentAnswer } from '../../Interfaces/istudent-answer';
import { StudentAnswerService } from '../../Services/student-answer-service';
@Component({
  selector: 'app-take-exam',
  imports: [HttpClientModule,ReactiveFormsModule],
  templateUrl: './take-exam.html',
  styleUrl: './take-exam.css'
})
export class TakeExam implements OnInit {


  mySub1!: Subscription;

 
  baseUrl2: string = 'https://localhost:7032/api/StudentAnswer';
  protected title = 'website';
  q:IQuestion[]=[];
  constructor(private cdr:ChangeDetectorRef,
              private r:ActivatedRoute,
              private router: Router, 
              private studentExamService:StudentExamService,
              private studentTakeExamService:StudentTakeExamService,
              private studentAnswerService:StudentAnswerService
              ) {}
  examId:string='';
  stId:string='';
  examTitle:string = "";
  startTime=this.getFormattedDate();
  examForm = new FormGroup({});

  ngOnInit(): void {
    this.r.params.subscribe(params=>{
      this.examId = params['eid'];
      this.stId = params['stid'];
      console.log(this.examId, this.stId);
    })

    this.mySub1 = this.studentTakeExamService.getExam(this.examId, this.stId).subscribe({
      next:(resp)=>{
        this.q = resp.question;
        this.examTitle = resp.name;
        this.buildForm();
        this.cdr.detectChanges();
      },
      error:(error)=>{
        console.log(error);
      }
    });
  
  }


  buildForm(): void {
    const group: { [key: string]: FormControl } = {};

    this.q.forEach(question => {
      group[question.id!.toString()] = new FormControl(null,Validators.required); 
    });

    this.examForm = new FormGroup(group);
  }



saveAnswers(): void {
 if (this.examForm.invalid) {
    alert("Please answer all questions.");
    this.examForm.markAllAsTouched(); 
    return;
  }

  let endTime = this.getFormattedDate();
  const correctAnswers = this.q.map(q => ({
    questionId: q.id,
    answerId: q.answers.find(a => a.isCorrect)?.id ?? null,
    grade:q.grade
  }));
  const result:Array<IStudentAnswer> = Object.entries(this.examForm.value).map(([questionId, answerId]) => ({
    StudentId: Number(this.stId),
    QuestionId: Number(questionId),
    AnswerId: Number(answerId)
  }));

  correctAnswers.sort((a, b) => a.questionId! - b.questionId!);
  result.sort((a, b) => a.QuestionId - b.QuestionId);

  let g = 0;
  for(var i=0 ; i<correctAnswers.length;i++) {
    if(correctAnswers[i].answerId == result[i].AnswerId) g+=correctAnswers[i].grade;
  }

  this.studentAnswerService.submitAnswers(result).subscribe({

    next:(res)=>{
      console.log(res);
    },
    error:(err)=>{
      console.log(err);
    }
    });
    const stExamData:IStudentExamData = {
      studentId:this.stId,
      examId:this.examId,
      studentGrade:g,
      startTime:this.startTime,
      endTime:endTime
    }
    
    this.studentExamService.addStudentExamData(stExamData).subscribe({
      next:(res)=>{
         this.router.navigate(['/result'], { state: { grade: g } });
      },
      error:(err)=>{
        console.log(err);
      }
    });
    console.log("Done");

  }




  getFormattedDate() {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  }
}
