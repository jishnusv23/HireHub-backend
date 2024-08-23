import { InterviewEntity } from "../entities";

export interface ICreateInterviewUsesCases{
    execute(data:InterviewEntity):Promise<InterviewEntity|null>
}