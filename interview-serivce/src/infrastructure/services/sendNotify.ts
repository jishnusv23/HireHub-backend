import { InterviewEntity } from "../../domain/entities";
import RabbitMQClient from "../MQ/client";

export const sendInterviewNotify = async (data: InterviewEntity) => {
  try {
    const client = await RabbitMQClient.getInstance();
    const interviewDataPromise = data.participants.map(async(participantEmail) => {
      return await client.produce(
     {...data,participantEmail},
      "InterviewNofication",
      "toNotif"
    );
    });
    const response=await Promise.all(interviewDataPromise)
    return response;
  } catch (error: any) {
    console.error(
      "Something wrong in interview notify sending function",
      error
    );
    throw new Error(error?.message)
  }
};
