import { TechQuestion } from "../models";
import { TechQuestionEntities } from "../../../../domain/entities";

export const AddQuestions=async(data:TechQuestionEntities):Promise<TechQuestionEntities|null>=>{
    try{
        console.log(data,'crating for this data')
        const saveData=await TechQuestion.create(data)
        return saveData


    }catch(error:any){
        console.error("Error in AddTechQuestion:", error);
        throw new Error(error?.message);
    }
}