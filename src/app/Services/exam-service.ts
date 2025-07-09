import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExam } from '../Interfaces/iexam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) {
  }
  baseURL: string = "https://localhost:7191/api/Exam";
  AdminUrl = 'https://localhost:7191/api/admin';
  StudentURL = 'https://localhost:7191/api/student';

  getExams(): Observable<Array<IExam>> {
    return this.http.get<Array<IExam>>(this.baseURL);
  }

  getExamById(id: number): Observable<IExam> {
    return this.http.get<IExam>(`${this.baseURL}/${id}`);
  }
  getAllStudents(): Observable<any> {
    return this.http.get(`${this.AdminUrl}/students`);
  }
  getStudentTakenExams(id: number) {
    return this.http.get(`${this.StudentURL}/${id}/results`);
  }
}
