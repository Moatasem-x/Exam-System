import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStudentAnswer } from '../Interfaces/istudent-answer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentAnswerService {

  constructor(private http:HttpClient) { }

  baseURL:string = "https://localhost:7032/api/StudentAnswer";

  submitAnswers(stAnswer:Array<IStudentAnswer>):Observable<Array<IStudentAnswer>> {
    return this.http.post<Array<IStudentAnswer>>(`${this.baseURL}/${localStorage.getItem('user_id')}`,stAnswer);
  }
}
