import { TechQuestionEntities } from "@/domain/entities";
import { IDependancies } from "../interface/IDependancies";

export const IAddquestionUseCases=(dependancies:IDependancies)=>{
    const {repositories:{AddQuestions}}=dependancies
    console.log(AddQuestions,'____________________')
    return {
        execute:async(data:TechQuestionEntities)=>{
            try{
                return await AddQuestions(data)

            }catch(error:any){
                 console.error("Someting wrong in IAddquestionUseCases", error);
                 throw new Error(error?.message);
            }
        }
        
    }
}