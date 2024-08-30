import { InterviewEntity } from "../entities";


export interface ICancelInterviewUseCases{
    execute(id:string):Promise<InterviewEntity|null>
}