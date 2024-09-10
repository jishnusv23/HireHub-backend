import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { generateMeetLink } from "../../_lib/LinkCreator/generateMeetLink";
import { fetchInstantMeetData } from "../../_lib/common/instantMeetData";


export const InstantMeetController=(dependancies:IDependancies)=>{
    const {}=dependancies
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
        }catch(error:any){
            next(error)
        }
    }
}