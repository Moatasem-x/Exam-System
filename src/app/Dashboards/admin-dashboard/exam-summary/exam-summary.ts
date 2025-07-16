import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, ElementRef, OnInit, ViewChild,  } from '@angular/core';
import Chart from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { StudentExamService } from '../../../Services/student-exam-service';

@Component({
  selector: 'app-exam-summary',
  imports: [],
  templateUrl: './exam-summary.html',
  styleUrl: './exam-summary.css'
})
export class ExamSummary implements OnInit {
  constructor(private studentExamService:StudentExamService, private cdr:ChangeDetectorRef){}
 @ViewChild('summaryCanvas') summaryCanvas!: ElementRef;
 mySub:Array<Subscription> = [];
 passCount:number = 0;
 failCount:number = 0;

  ngOnInit(): void {
    this.mySub.push(this.studentExamService.getStudentExamData().subscribe({
      next: (resp) => {
        for (let i = 0; i < resp.length; i++) {
          if(resp[i].studentGrade >= (resp[i].minGrade || 0)) {
            this.passCount++;
          }    
          else {
            this.failCount++;
          }
        }
      

      },
      complete: () => {
        new Chart(this.summaryCanvas.nativeElement, {
          type: 'pie',
          data: {
            labels: ['Passed', 'Failed'],
            datasets: [{
              data: [this.passCount, this.failCount],
              backgroundColor: ['#28a745', '#dc3545']
            }]
          },
          options: {
            plugins: {
              legend: { position: 'bottom' }
            }
          }
        });
        this.cdr.detectChanges();
      }
    }))
  }
}

