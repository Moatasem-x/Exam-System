import { Component, Input } from '@angular/core';
import { IExam } from '../../Interfaces/iexam';
import { IStudentExamData } from '../../Interfaces/istudent-exam-data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-taken-exam-card',
  imports: [RouterLink],
  templateUrl: './taken-exam-card.html',
  styleUrls: ['./taken-exam-card.css']
})
export class TakenExamCard {
  @Input() studentID !: any ;
  @Input() exam :any;


}
