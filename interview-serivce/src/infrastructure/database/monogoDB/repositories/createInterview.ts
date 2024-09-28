import { interview } from "../models";
import { InterviewEntity } from "../../../../domain/entities";


export const createInterview = async (
  data: InterviewEntity
): Promise<InterviewEntity | any> => {
  try {
    
    
  
       const saveData = await interview.create(data);



        return saveData
    
  } catch (error: any) {
    console.error("Error in createInterview:", error);
    throw new Error(error?.message);
  }
};
