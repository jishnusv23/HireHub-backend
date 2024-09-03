import { InterviewEntity } from "../../../../domain/entities";
import { interview } from "../models";

export const fetchCurrentInterview=async(uniqueId:string,interviewerId:string):Promise<InterviewEntity|null>=>{
    try{
        const currentInterview=await interview.findOne({uniqueId:uniqueId,interviewerId:interviewerId})
        if(currentInterview){
            return currentInterview
        }
        return null
    }catch(error:any){
        console.error('Something wrong in fetchCurrentInterview',error);
        throw new Error(error?.message)
        
    }

}