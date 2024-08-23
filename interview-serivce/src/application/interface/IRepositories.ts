import { InterviewEntity } from "../../domain/entities";

export interface IRepositories {
  createInterview: (data: InterviewEntity) => Promise<InterviewEntity | null>;
}
