import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { Register } from './Account/register/register';
import { Login } from './Account/login/login';
import { CurrentExams } from './Pages/current-exams/current-exams';
import { Dashboard } from './Components/dashboard/dashboard';
import { AdminDashboard } from './Components/admin-dashboard/admin-dashboard';
import { AllStudents } from './Components/all-students/all-students';
import { StudentExams } from './Components/student-exams/student-exams';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path:"home", component: Home},
    {path: "register", component: Register},
    {path: "login", component: Login},
    {path: "exams", component: CurrentExams},
    {path: "stdash", component: Dashboard},
    {path: "admindash", component: AdminDashboard},
    {path: "students" ,component : AllStudents },
    {path: "student/:id/exams" ,component : StudentExams }


];
