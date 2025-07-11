import { INewAns } from "./INewAns";

export interface INewQ{
     examId:Number;
     body:string;
     grade:number;
     type:string;
     answers:INewAns[];
}