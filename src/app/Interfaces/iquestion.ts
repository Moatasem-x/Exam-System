import { IAnswer } from "./ianswer";

export interface IQuestion {
    type:string;
    body:string;
    grade:number;
    id:number;
    answers:IAnswer[];

}
