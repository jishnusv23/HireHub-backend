import { InterviewEntity } from "../entities";

export interface IGetAllInterivewesByIdUseCases {
  execute(id: string): Promise<InterviewEntity[]|null>;
}