import { InterviewEntity } from "../entities";

export interface IMeetAccessIntervieweeUseCases{
    execute:(uniqueId:string)=>Promise<InterviewEntity|null>
}