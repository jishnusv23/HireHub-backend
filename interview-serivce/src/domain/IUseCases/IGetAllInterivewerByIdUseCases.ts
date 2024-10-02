import { InterviewEntity } from "../entities";

export interface IGetAllInterivewesByIdUseCases {
  execute(id: string): Promise<{data:InterviewEntity[], totalInterviews :number,completedInterviews:number}>;
}