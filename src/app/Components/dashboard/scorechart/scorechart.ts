import { AfterViewInit, Component, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { IStudentExamData } from '../../../Interfaces/istudent-exam-data';

@Component({
  selector: 'app-scorechart',
  templateUrl: './scorechart.html',
  styleUrls: ['./scorechart.css'],
})
export class Scorechart implements AfterViewInit, OnChanges {
  @ViewChild('scoreCanvas') scoreCanvas!: ElementRef;
  @Input() score:string = "";

  ngAfterViewInit(): void {
    
  }

  ngOnChanges(): void {

    new Chart(this.scoreCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Score', 'Remaining'],
        datasets: [
          {
            data: [Number(this.score.slice(0, this.score.length - 1)), 100 - Number(this.score.slice(0, this.score.length - 1))],
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
