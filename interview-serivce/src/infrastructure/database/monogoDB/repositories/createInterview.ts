import { interview } from "../models";
import { InterviewEntity } from "../../../../domain/entities";

export const createInterview=async(data:InterviewEntity):Promise<InterviewEntity|any>=>{
    try{
        console.log("🚀 ~ file: createInterview.ts:5 ~ createInterview ~ data:", data)
            

    }catch(error:any){
        throw new Error(error?.message)
    }
}