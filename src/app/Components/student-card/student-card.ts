import { Component, Input } from '@angular/core';
import { IStudent } from '../../Interfaces/istudent';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-card',
  imports: [RouterLink],
  templateUrl: './student-card.html',
  styleUrl: './student-card.css'
})
export class StudentCard {
  constructor(){

  }

  @Input() student!:IStudent;
}
