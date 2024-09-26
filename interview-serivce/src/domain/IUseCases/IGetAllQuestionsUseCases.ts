import { TechQuestionEntities } from "../entities";

export interface IGetAllQuestionsUseCases{
    execute:(page?:number,limit?:number,userId?:string)=>Promise<TechQuestionEntities|null>
}