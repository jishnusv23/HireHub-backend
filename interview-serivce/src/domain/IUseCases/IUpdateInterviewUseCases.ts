import { InterviewEntity } from "../entities";

export interface IUpdateInterviewUseCases{
    execute(data:InterviewEntity,id:string):Promise<InterviewEntity|null>
}