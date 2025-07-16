import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { StudentExamService } from '../../../Services/student-exam-service';

@Component({
  selector: 'app-average',
  imports: [],
  templateUrl: './average.html',
  styleUrl: './average.css'
})
export class Average implements OnInit{
  constructor(private studentExamService:StudentExamService){}

  grouped:any = {};
  averages:any;
  examsNames:Array<string> = [];
  avgList:Array<number> = [];
  ngOnInit(): void {
    this.studentExamService.getStudentExamData().subscribe({
      next: (resp) => {

        // Group and sum scores
        for (const r of resp) {
          if(typeof r.examName != "undefined"){
            if (!this.grouped[r.examName]) {
              this.grouped[r.examName] = { total: 0, count: 0 };
            }
            this.grouped[r.examName].total += r.studentGrade;
            this.grouped[r.examName].count += r.examGrade;
          }
          

        }

        // Create new array with averages
        this.averages = Object.keys(this.grouped).map(name => {
          const g = this.grouped[name];
          return {
            examname: name,
            averageScore: (g.total / g.count ) * 100
          };
        });

        for (let i = 0; i < this.averages.length; i++) {
          this.examsNames.push(this.averages[i].examname);
          this.avgList.push(this.averages[i].averageScore);
          
        }
      },
      complete: () => {
        new Chart(this.avgScoreCanvas.nativeElement, {
          type: 'bar',
          data: {
            labels: this.examsNames,
            datasets: [{
              label: 'Avg. Score',
              data: this.avgList,
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
    })
  }

@ViewChild('avgScoreCanvas') avgScoreCanvas!: ElementRef;



  ngAfterViewInit(): void {
    
  }
}
