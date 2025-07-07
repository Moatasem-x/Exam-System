import { Component, OnInit } from '@angular/core';
import { Average } from "./average/average";
import { ExamSummary } from "./exam-summary/exam-summary";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [Average, ExamSummary,CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
teacher = { name: 'Mr. Amr' };

  summary = [
    { title: 'Total Students', value: '53', subtext: 'Unique participants', color: 'text-primary' },
    { title: 'Total Exams', value: '3', subtext: 'Active this month', color: 'text-success' },
    { title: 'Avg. Score', value: '75%', subtext: 'All exams', color: 'text-info' }
  ];

  exams = [
    { name: 'Math Exam', students: 20, avgScore: 76 },
    { name: 'Physics Exam', students: 18, avgScore: 83 },
    { name: 'Chemistry Exam', students: 15, avgScore: 67 }
  ];

  ngOnInit(): void {}
}
