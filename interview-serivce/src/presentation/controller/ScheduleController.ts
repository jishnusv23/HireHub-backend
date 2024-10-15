import { sendInterviewNotify } from "../../infrastructure/services/sendNotify";
import { generateMeetLink } from "../../_lib/LinkCreator/generateMeetLink";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode ";
import { IDependancies } from "../../application/interface/IDependancies";
import { Request, Response, NextFunction } from "express";
import { updateUserRole } from "../../infrastructure/services/updateUserRole ";
import { InterviewEntity } from "../../domain/entities";

export const SchedulInterviewController = (dependancies: IDependancies) => {
  const {
    useCases: { IScheduleUseCases },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate and sanitize input here if needed
      console.log("Received scheduling request:", req.body);

      const { meetingLink, uniqueId } = generateMeetLink(req.body);
      const interviewData = {
        ...req.body,
        meetingLink,
        uniqueId,
      };

      const response = await IScheduleUseCases(dependancies).execute(
        interviewData
      )
      // console.log("ScheduleUseCases response:", response);

      if (response) {
        const information = await sendInterviewNotify(response);
        

         const roleUpdateResult = await updateUserRole(response.interviewerId as string);
         if (roleUpdateResult && roleUpdateResult.accessToken) {
           res.cookie("access_token", roleUpdateResult.accessToken, {
             httpOnly: true,
           
           });
         }

        if (information) {
          
          return res
            .status(HttpStatusCode.CREATED)
            .json({
              success: true,
              data: response,
              message: "Schedule successful",
            });
        }

      }

      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ success: false,data:null, message: "Invalid form data" });
    } catch (error: any) {
      console.error("Error in scheduling interview:", error);
      next(error)
    }
  };
};
