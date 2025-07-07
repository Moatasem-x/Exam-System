import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-average',
  imports: [],
  templateUrl: './average.html',
  styleUrl: './average.css'
})
export class Average {

@ViewChild('avgScoreCanvas') avgScoreCanvas!: ElementRef;

  ngAfterViewInit(): void {
    new Chart(this.avgScoreCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Math', 'Physics', 'Chemistry'],
        datasets: [{
          label: 'Avg. Score',
          data: [76, 83, 67],
          backgroundColor: ['#0d6efd', '#198754', '#ffc107']
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true, max: 100 }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}
