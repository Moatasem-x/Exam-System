import { HttpClient, withXsrfConfiguration } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IExam } from '../../Interfaces/iexam';

@Component({
  selector: 'app-add-exam',
  imports: [ReactiveFormsModule],
  templateUrl: './add-exam.html',
  styleUrl: './add-exam.css'
})
export class AddExam {


  constructor(private http:HttpClient, private router:Router) {}

 newExamForm  = new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern('^[a-zA-Z 0-9]+$')]),
     duration: new FormControl('', [
    Validators.required,
    Validators.pattern(/^[0-9]+$/), 
    Validators.min(10),              
    Validators.max(300)             
  ])
  });

  get getName(){
    return this.newExamForm.controls['name'];
  }

  get getDuration(){
    return this.newExamForm.controls['duration'];
  }
AddExam(){
  let url = "https://localhost:7032/api/Exam";
  if(this.newExamForm.status=="VALID"){
    
    let examData={
      name:this.getName.value,
      duration:this.getDuration.value,
      mingrade:0,
      grade:0
    }
    this.http.post<IExam>(url,examData).subscribe({
      next:(resp)=>{
        this.router.navigateByUrl("/exams");
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

}
}
