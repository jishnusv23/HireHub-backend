import { IDependancies } from "../interface/IDependancies";
import { InterviewEntity } from "../../domain/entities";
export const IMeetAccessIntervieweeUseCases=(dependacies:IDependancies)=>{
    const {repositories:{MeetAccessInterviewee}}=dependacies

    return {
        execute:async(uniqueId:string)=>{
            try{   
                return await MeetAccessInterviewee(uniqueId)

            }catch(error:any){
                console.error('Someting wrong in MeetAccessUsecases',error);
                throw new Error(error?.message)
                

            }
        }
    }
}