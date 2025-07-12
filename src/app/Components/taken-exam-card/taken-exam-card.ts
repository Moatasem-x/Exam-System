import { Component, Input } from '@angular/core';
import { IExam } from '../../Interfaces/iexam';
import { IStudentExamData } from '../../Interfaces/istudent-exam-data';

@Component({
  selector: 'app-taken-exam-card',
  imports: [],
  templateUrl: './taken-exam-card.html',
  styleUrl: './taken-exam-card.css'
})
export class TakenExamCard {

  constructor(){}

  @Input() exam!:IStudentExamData;

}
