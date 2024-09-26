import { TechQuestionEntities } from "../entities";

export interface IAddquestionUseCases{
    execute(data:TechQuestionEntities):Promise<TechQuestionEntities|null>
}