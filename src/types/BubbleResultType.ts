export interface  BubbleResultType{
  attempt:number
  level: "beginner" | "intermediate" | "pro";
  score: number;
  speed: number;
  correctInput: number;
  wrongInput: number;
  duration: number;
  date:string;
}