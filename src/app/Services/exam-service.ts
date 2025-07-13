import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExam } from '../Interfaces/iexam';
import { IStudentExamData } from '../Interfaces/istudent-exam-data';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) {
  }
  baseURL: string = "https://localhost:7191/api/Exam";
  StudentURL = 'https://localhost:7191/api/student';

  getExams(): Observable<Array<IExam>> {
    return this.http.get<Array<IExam>>(this.examURL);
  }

  getExamById(id: number): Observable<IExam> {
    return this.http.get<IExam>(`${this.baseURL}/${id}`);
  }

  getStudentTakenExams(id: number):Observable<Array<IStudentExamData>> {
    return this.http.get<Array<IStudentExamData>>(`${this.StudentURL}/${id}/results`);
  }
}
