import { interview } from "../models";
import { InterviewEntity } from "../../../../domain/entities";
import RabbitMQClient from "../../../MQ/client";

export const createInterview = async (
  data: InterviewEntity
): Promise<InterviewEntity | any> => {
  try {
    const client = await RabbitMQClient.getInstance();
    const updateRole = await client.produce(data._id,'updateRoleInterviewer','toUser')
    if(updateRole){
       const saveData = await interview.create(data);
        return saveData;
    }
    return null
    
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
