import { AfterViewInit, Component, ElementRef, ViewChild,  } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-exam-summary',
  imports: [],
  templateUrl: './exam-summary.html',
  styleUrl: './exam-summary.css'
})
export class ExamSummary implements AfterViewInit {
 @ViewChild('summaryCanvas') summaryCanvas!: ElementRef;

  ngAfterViewInit(): void {
    new Chart(this.summaryCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Passed', 'Failed'],
        datasets: [{
          data: [42, 11],
          backgroundColor: ['#28a745', '#dc3545']
        }]
      },
      options: {
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }
}

