import { interview } from "../models";
import { InterviewEntity } from "../../../../domain/entities";
import RabbitMQClient from "../../../MQ/client";

export const createInterview = async (
  data: InterviewEntity
): Promise<InterviewEntity | any> => {
  try {
    const client = await RabbitMQClient.getInstance();
    const updateRole = await client.produce(data.interviewerId,'updateRoleInterviewer','toUser')
    console.log("🚀 ~ file: createInterview.ts:11 ~ updateRole:", updateRole)
    if(updateRole){
       const saveData = await interview.create(data);
        return saveData;
    }
    return null
    
  } catch (error: any) {
    console.error("Error in createInterview:", error);
    throw new Error(error?.message);
  }
};
