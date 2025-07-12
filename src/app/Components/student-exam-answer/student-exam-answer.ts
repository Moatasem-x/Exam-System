import { ChangeDetectorRef, Component } from '@angular/core';
import { ExamService } from '../../Services/exam-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-exam-answer',
  imports: [CommonModule],
  templateUrl: './student-exam-answer.html',
  styleUrl: './student-exam-answer.css'
})
export class StudentExamAnswer {
questions: any[] = [];
exam !: any ;
constructor(private examService: ExamService , private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}
ngOnInit() {
  const studentId = Number(this.route.snapshot.paramMap.get('studentId'));
  const examId = Number(this.route.snapshot.paramMap.get('examId'));

  console.log('Student:', studentId, 'Exam:', examId);
  this.examService.getExamById(examId).subscribe({
    next:  (res :any )=>{
      console.log(res);
      this.exam = res;
    }
  });
  this.examService.getStudentExamAnswers(examId, studentId).subscribe({
    next: (res: any) => {
      this.questions = res;
      console.log(res);
      this.cdr.detectChanges();
    },
    error: err => console.error('Failed to load exam answers', err)
  });
}

}
