import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode ";
import { IDependancies } from "../../application/interface/IDependancies";

export const MeetVerifyAccessController=(dependancies:IDependancies)=>{
    const {useCases:{IMeetAccessIntervieweeUseCases}}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.query,'meet validation')
            const { uniqueId ,email}=req.query;
            const response=await IMeetAccessIntervieweeUseCases(dependancies).execute(uniqueId as string)
           const Emailvalid= response?.participants.some((participantEmail)=>participantEmail===email)
           if(response){
           if (response.instantMeet) {
        
             if (response.meetParticipants ==4) {
               return res.status(HttpStatusCode.FORBIDDEN).json({
                 success: false,
                 message:
                   "Maximum participant limit reached. Cannot join the meeting.",
               });
             }

            
             return res.status(HttpStatusCode.OK).json({
               success: true,
               message: "You can access this meeting",
               data: response,
             });
           }

           
          if(!Emailvalid) {
                return res.status(HttpStatusCode.BAD_REQUEST).json({
                  success: false,
                  message:
                    " You do not have access to this meeting.",
                });
            }else if(response?.Ongoing){
                return res.status(HttpStatusCode.CREATED).json({success:true,messagea:'you can acess this link go...'})
            }
        }else{
            return res.status(HttpStatusCode.BAD_REQUEST).json({
              success: false,
              message: "YSession has not started yet",
            });
        }
        }catch(error:any){
            next(error)
        }
    }
}