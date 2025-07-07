import { Component, OnInit } from '@angular/core';
import { Scorechart } from "./scorechart/scorechart";
import { Categorychart } from "./categorychart/categorychart";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [Scorechart, Categorychart, CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  student = { name: "Amr" };

  stats = [
    { title: 'Total Exams', value: '6', subtext: '1 completed', color: 'text-primary' },
    { title: 'Average Score', value: '100%', subtext: 'Perfect Performance', color: 'text-success' },
    { title: 'Questions Answered', value: '1/1', subtext: '100% Accuracy', color: 'text-info' }
  ];

  ngOnInit(): void {}
}
