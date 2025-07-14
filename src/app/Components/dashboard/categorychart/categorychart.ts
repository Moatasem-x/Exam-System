import { AfterViewInit, Component, ViewChild, ElementRef, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { IStudentExamData } from '../../../Interfaces/istudent-exam-data';

@Component({
  selector: 'app-categorychart',
  standalone: true,
  templateUrl: './categorychart.html',
  styleUrls: ['./categorychart.css'],
})
export class Categorychart implements AfterViewInit {
  constructor(private cdr:ChangeDetectorRef){
    
  }
  // @ViewChild('categoryCanvas') categoryCanvas!: ElementRef;
  @ViewChild('categoryCanvas', { static: false }) categoryCanvas!: ElementRef;
  @Input() takenExams:Array<IStudentExamData> = [];
  examsNames:Array<string | undefined>=[];
  percentageList:Array<number>=[];

  


  ngAfterViewInit(): void {
    for (let i = 0; i < this.takenExams.length; i++) {
      this.examsNames.push(this.takenExams[i].examName);
      this.percentageList.push((this.takenExams[i].studentGrade / (this.takenExams[i].examGrade || 1)) * 100);
      console.log("exam: ",this.takenExams[i].examGrade);
      console.log("st: ",this.takenExams[i].studentGrade);

    
    }
    console.log(this.percentageList);
    new Chart(this.categoryCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.examsNames,
        datasets: [{
          label: 'Correct (%)',
          data: this.percentageList,
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
    this.cdr.detectChanges();
  }
}
