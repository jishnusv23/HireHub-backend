import { InterviewEntity } from "../../../../domain/entities";
import { interview } from "../models";

export const MeetAccessInterviewee=async(uniqueId:string):Promise<InterviewEntity|null>=>{
    try{
        const findAccessMeet=await interview.findOne({uniqueId:uniqueId})
        if(findAccessMeet){
            return findAccessMeet
        }
        return null
    }catch(error:any){
        console.error('Something wrong in MeetAccessinterveiweeRepo',error);
        throw new Error(error?.message)
        
    }
}