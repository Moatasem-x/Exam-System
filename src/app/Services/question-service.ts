import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuestion } from '../Interfaces/iquestion';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) {
  }
  baseURL: string = "https://localhost:7032/api/Question";
  AdminUrl = 'https://localhost:7032/api/admin';
  StudentURL = 'https://localhost:7032/api/student';

  getQuestions(): Observable<Array<IQuestion>> {
    return this.http.get<Array<IQuestion>>(this.baseURL);
  }

  getQuestionById(id: number): Observable<IQuestion> {
    return this.http.get<IQuestion>(`${this.baseURL}/${id}`);
  }

  addQuestion(q:IQuestion):Observable<IQuestion> {
    return this.http.post<IQuestion>(this.baseURL, q);
  }

  editQuestion(q:IQuestion, qId?:number):Observable<IQuestion> {
    return this.http.put<IQuestion>(`${this.baseURL}/${qId}`, q);
  }

  deleteQuestion(qId?:number):Observable<IQuestion> {
    return this.http.delete<IQuestion>(`${this.baseURL}/${qId}`);
  }
}
