import { interview } from "../models";
import { InterviewEntity } from "../../../../domain/entities";
import RabbitMQClient from "../../../MQ/client";

export const createInterview = async (
  data: InterviewEntity
): Promise<InterviewEntity | any> => {
  try {
    if (!data._id) {
      throw new Error("data._id is undefined");
    }

    const client = await RabbitMQClient.getInstance();
    const updateRole = await client.produce(
      data._id,
      "updateRoleInterviewer",
      "toUser"
    );
    if (updateRole) {
      const saveData = await interview.create(data);
      console.log("🚀 ~ file: createInterview.ts:21 ~ saveData:", saveData);
      return saveData;
    } else {
      throw new Error("updateRole failed to return a valid value");
    }
  } catch (error: any) {
    console.error("Error in createInterview:", error);
    throw new Error(error?.message);
  }
};
