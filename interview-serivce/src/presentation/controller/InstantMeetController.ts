import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { generateMeetLink } from "../../_lib/LinkCreator/generateMeetLink";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode ";
import { fetchInstantMeetData } from "../../_lib/common/instantMeetData";
import { updateUserRole } from "../../infrastructure/services/updateUserRole ";


export const InstantMeetController=(dependancies:IDependancies)=>{
    const {useCases:{IScheduleUseCases}}=dependancies
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body,'instantmeetInterviewerID');
            console.log(`req.user`,req.user)

            const {meetingLink,uniqueId}=generateMeetLink(req.body)
            const otherData = fetchInstantMeetData();
            const interviewData={
                ...req.body,
                meetingLink,
                uniqueId,
                ...otherData
                
            }
            console.log("🚀 ~ file: InstantMeetController.ts:17 ~ returnasync ~ interviewData:", interviewData)

            const response=await IScheduleUseCases(dependancies).execute(interviewData)
            console.log("🚀 ~ file: InstantMeetController.ts:26 ~ returnasync ~ response:", response)
            if(response){
                const updateRole=await updateUserRole(response.interviewerId as string)
                  if (updateRole && updateRole.accessToken) {
           res.cookie("access_token", updateRole.accessToken, {
             httpOnly: true,
           
           });
            }

           return res
            .status(HttpStatusCode.CREATED)
            .json({
              success: true,
              data: response,
              message: "InstantMeet successful",
            });
        }else{
               return res
                 .status(HttpStatusCode.BAD_REQUEST)
                 .json({
                   success: false,
                   data: null,
                   message: "Invalid form data",
                 });
        }
        }catch(error:any){
            next(error)
        }
    }
}