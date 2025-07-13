import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExam } from '../Interfaces/iexam';

@Injectable({
  providedIn: 'root'
})
export class StudentTakeExamService {

  constructor(private http:HttpClient) { }

  baseURL:string = "https://localhost:7032/api/Student";

  getExam(eId:string, stId:string):Observable<IExam> {
    return this.http.get<IExam>(`${this.baseURL}/${stId}/Exam/${eId}`);
  }
}
