import { NextFunction, Request, Response } from "express";
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
            if(response.instantMeet){
                return res
                  .status(201)
                  .json({
                    success: true,
                    message: "you can acess this link go...",
                  });
            }

           
          if(!Emailvalid) {
                return res.status(400).json({
                  success: false,
                  message:
                    " You do not have access to this meeting.",
                });
            }else if(response?.Ongoing){
                return res.status(201).json({success:true,messagea:'you can acess this link go...'})
            }
        }else{
            return res.status(400).json({
              success: false,
              message: "YSession has not started yet",
            });
        }
        }catch(error:any){
            next(error)
        }
    }
}