import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExam } from '../Interfaces/iexam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http:HttpClient) { 
  }
    baseURL: string = "https://localhost:7191/api/Exam";


  getExams(): Observable<Array<IExam>> {
    return this.http.get<Array<IExam>>(this.baseURL);
  }

  getExamById(id: number): Observable<IExam> {
    return this.http.get<IExam>(`${this.baseURL}/${id}`);
  }
}
