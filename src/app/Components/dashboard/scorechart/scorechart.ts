import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-scorechart',
  templateUrl: './scorechart.html',
  styleUrls: ['./scorechart.css'],
})
export class Scorechart implements AfterViewInit {
  @ViewChild('scoreCanvas') scoreCanvas!: ElementRef;

  ngAfterViewInit(): void {
    new Chart(this.scoreCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Score', 'Remaining'],
        datasets: [
          {
            data: [87, 13],
            backgroundColor: ['#4caf50', '#e0e0e0'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: '80%',
        rotation: -90,
        circumference: 180,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      },
    });
  }
}
