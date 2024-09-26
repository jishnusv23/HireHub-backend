import { IDependancies } from "../interface/IDependancies";


export const IGetAllQuestionUseCases=(dependancies:IDependancies)=>{
    const {repositories:{getAllQuestions}}=dependancies

    return {
        execute:async(page:number=1,limit:number=5,userId?:string)=>{
            return await getAllQuestions(page,limit,userId)
        }
    }

}