import { Injectable } from '@angular/core';
import { IStudentExamData } from '../Interfaces/istudent-exam-data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentExamService {

  constructor(private http:HttpClient) { }
  baseURL:string = "https://localhost:7032/api/StudentExam";

  addStudentExamData(stExamData:IStudentExamData):Observable<IStudentExamData> {
    return this.http.post<IStudentExamData>(`${this.baseURL}/${localStorage.getItem('user_id')}`,stExamData);
  }
}
