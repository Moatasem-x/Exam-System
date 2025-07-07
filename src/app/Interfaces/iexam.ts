import { IQuestion } from "./iquestion";

export interface IExam {
    id:number;
    name:string;
    duration:number;
    grade:number;
    minGrade:number;
    question:IQuestion[]

}
