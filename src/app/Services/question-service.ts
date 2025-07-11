import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuestion } from '../Interfaces/iquestion';
import { INewQ } from '../Interfaces/INewQ';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) {
  }
  baseURL: string = "https://localhost:7191/api/Question";
  AdminUrl = 'https://localhost:7191/api/admin';
  StudentURL = 'https://localhost:7191/api/student';

  getQuestions(): Observable<Array<IQuestion>> {
    return this.http.get<Array<IQuestion>>(this.baseURL);
  }

  getQuestionById(id: number): Observable<IQuestion> {
    return this.http.get<IQuestion>(`${this.baseURL}/${id}`);
  }

  addQuestion(q:INewQ):Observable<INewQ> {
    return this.http.post<INewQ>(this.baseURL, q);
  }

  editQuestion(q:IQuestion, qId:number):Observable<IQuestion> {
    return this.http.put<IQuestion>(`${this.baseURL}/${qId}`, q);
  }

  deleteQuestion(qId:number):Observable<IQuestion> {
    return this.http.delete<IQuestion>(`${this.baseURL}/${qId}`);
  }
}
