
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
      const {meetingLink,uniqueId}=generateMeetLink(req.body)
      console.log("🚀 ~ file: ScheduleController.ts:15 ~ return ~ uniqueId:", uniqueId)
      console.log("🚀 ~ file: ScheduleController.ts:15 ~ return ~ meetingLink:", meetingLink)

      // const response=await IScheduleUseCases(dependancies).execute(req.body)
      // console.log("🚀 ~ file: ScheduleController.ts:12 ~ returnasync ~ response:", response)
    } catch (error: any) {
      next(error);
    }
  };
};
