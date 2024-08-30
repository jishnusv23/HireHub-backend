import { InterviewEntity } from "@/domain/entities";
import { IDependancies } from "../interface/IDependancies";

export const IUpdateUseCases=(depnedancies:IDependancies)=>{
    const{repositories:{updateInterview}}=depnedancies
    return {
        execute:async(data:InterviewEntity,id:string)=>{
            try{
                console.log(data,id,'updateUsecase')
                return updateInterview(data,id)
            }catch(error:any){
                console.error('Something wrong in updateUsecase',error);
                throw new Error(error?.message)
                
            }
        }

    }
}