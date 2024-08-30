import { InterviewEntity } from "../../../../domain/entities";
import { interview } from "../models";

export const cancelInterview=async(id:string):Promise<InterviewEntity|null>=>{
    try{
        const updateStatus = await interview.findOneAndUpdate(
          { _id: id },
          { $set: { interviewStatus: "Cancelled" } },
          {new:true}
        );
        if(updateStatus){
            return updateStatus
        }
        return null
    }catch(error:any){
        console.error('Something wrong in cancelInterview repo',error);
        throw new Error(error?.message)
        
    }

}