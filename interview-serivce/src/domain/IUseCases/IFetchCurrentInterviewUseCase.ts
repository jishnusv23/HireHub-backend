import { InterviewEntity } from "../entities";

export interface IFetchCurrentInterviewUseCases{
    execute(uniqueId:string,interviewerId:string):Promise<InterviewEntity|null>
}