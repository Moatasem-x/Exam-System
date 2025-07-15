import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { Register } from './Account/register/register';
import { Login } from './Account/login/login';
import { CurrentExams } from './Pages/current-exams/current-exams';
import { Dashboard } from './Components/dashboard/dashboard';
import { AdminDashboard } from './Components/admin-dashboard/admin-dashboard';
import { AllStudents } from './Components/all-students/all-students';
import { StudentExams } from './Components/student-exams/student-exams';
import { AddExam } from './Components/add-exam/add-exam';
import { ExamQuestions } from './Components/exam-questions/exam-questions';
import { TakeExam } from './Pages/take-exam/take-exam';
import { AuthGuard, AdminGuard, StudentGuard } from './guards/auth.guard';
import { Result } from './Components/result/result';
import { StudentExamAnswer } from './Components/student-exam-answer/student-exam-answer';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path:"home", component: Home},
    {path: "register", component: Register},
    {path: "login", component: Login},
    {path: "exams", component: CurrentExams, canActivate: [AuthGuard]},
    {path: "stdash", component: Dashboard, canActivate: [StudentGuard]},
    {path: "admindash", component: AdminDashboard, canActivate: [AdminGuard]},
    {path: "students", component: AllStudents, canActivate: [AdminGuard]},
    {path: "newexam", component: AddExam, canActivate: [AdminGuard]},
    {path:"examquestions/:id", component: ExamQuestions, canActivate: [AdminGuard]},
    {path: "takeexam/:eid/:stid", component: TakeExam, canActivate: [StudentGuard]},
    {path: "result", component: Result, canActivate: [StudentGuard]},
    {path: "student/:studentID/exams/:examID" ,component : StudentExamAnswer },
    {path: "student/:studentID/exams" ,component : StudentExams, canActivate: [AuthGuard] },
    {path: "**", redirectTo: "/login"}

    // {path: "", redirectTo: "home", pathMatch: "full"},
    // {path:"home", component: Home},
    // {path: "register", component: Register},
    // {path: "login", component: Login},
    // {path: "exams", component: CurrentExams},
    // {path: "stdash", component: Dashboard},
    // {path: "admindash", component: AdminDashboard},
    // {path: "students", component: AllStudents},
    // {path: "newexam", component: AddExam},
    // {path:"examquestions/:id", component: ExamQuestions},
    // {path: "takeexam/:eid/:stid", component: TakeExam},
    // {path: "result", component: Result},
    // {path: "student/:studentID/exams/:examID" ,component : StudentExamAnswer },
    // {path: "student/:studentID/exams" ,component : StudentExams }

];