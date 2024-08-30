import { interview } from "../models";
import { InterviewEntity,  } from "../../../../domain/entities";

export const updateInterview=async(data:InterviewEntity,id:string):Promise<InterviewEntity|null>=>{

    try{
        const updateCurrentInterview=await interview.findOneAndUpdate({_id:id},data,{new:true})
        if(updateCurrentInterview){

            return updateCurrentInterview
        }
        return null

    }catch(error:any){
        console.error('Something wrong in updateInterview',error);
        throw new Error(error?.message)
        
    }

}