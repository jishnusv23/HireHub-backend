import { interview } from "../models";
import { InterviewEntity } from "../../../../domain/entities";

export const createInterview = async (
  data: InterviewEntity
): Promise<InterviewEntity | any> => {
  try {
    console.log(
      "🚀 ~ file: createInterview.ts:5 ~ createInterview ~ data:",
      data
    );
    // const interviewData = new interview({
    //   title: data.title,
    //   description: data.description,
    //   interviewType: data.interviewType,
    //   jobPosition:data.jobPosition,
    //   scheduledDateTime:new Date(data.scheduledDateTime),
    //   participants:data.participants
    // });
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
