
import { sendInterviewNotify } from "../../infrastructure/services/sendNotify";
import { generateMeetLink } from "../../_lib/LinkCreator/generateMeetLink";
import { IDependancies } from "../../application/interface/IDependancies";
import { Request, Response, NextFunction } from "express";

export const SchedulInterviewController = (dependancies: IDependancies) => {
  const {
    useCases: { IScheduleUseCases },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const { meetingLink, uniqueId } = generateMeetLink(req.body);
      const interviewData={
        ...req.body,
        meetingLink,
        uniqueId
      }
      const response=await IScheduleUseCases(dependancies).execute(interviewData)
      console.log("🚀 ~ file: ScheduleController.ts:12 ~ returnasync ~ response:", response)
      if(response){

        const information=sendInterviewNotify(response)
        console.log("🚀 ~ file: ScheduleController.ts:17 ~ return ~ information:", information)
      }
    } catch (error: any) {
      next(error);
    }
  };
};
