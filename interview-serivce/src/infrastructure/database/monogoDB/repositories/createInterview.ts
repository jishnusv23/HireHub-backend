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
    const interviewData = new interview({
      title: data.title,
      interviewerId: data.interviewerId,
      description: data.description,
      interviewType: data.interviewType,
      jobPosition: data.jobPosition,
      interviewStatus: "Scheduled",
      date: new Date(data.date),
      meetingLink:data.meetingLink,
      uniqueId:data.uniqueId,
      participants: data.participants,
    });
    const saveData=await interviewData.save()
    return saveData
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
