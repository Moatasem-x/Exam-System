import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudent } from '../Interfaces/istudent';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }
  baseURL:string = "https://localhost:7032/api/admin"

  getStudents(): Observable<IStudent> {
    return this.http.get<IStudent>(`${this.baseURL}/students`);
  }
}
