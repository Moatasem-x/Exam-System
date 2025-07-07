import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-categorychart',
  standalone: true,
  templateUrl: './categorychart.html',
  styleUrls: ['./categorychart.css'],
})
export class Categorychart implements AfterViewInit {
  @ViewChild('categoryCanvas') categoryCanvas!: ElementRef;

  ngAfterViewInit(): void {
    new Chart(this.categoryCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Math', 'Science', 'English', 'History'],
        datasets: [{
          label: 'Correct (%)',
          data: [90, 75, 85, 60],
          backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545']
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { beginAtZero: true, max: 100 },
          y: { ticks: { color: '#444' } }
        }
      }
    });
  }
}
