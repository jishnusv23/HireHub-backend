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
           if(Emailvalid){

           
            if(response?.Ongoing){
                return res.status(200).json({success:true,message:'Interview is starting go.....'})

            }else{
                return res
                  .status(400)
                  .json({
                    success: false,
                    message: "Session has not started yet",
                  });
            }
        }else{
            return res
              .status(400)
              .json({
                success: false,
                message: "You do not have access to this meeting.",
              });
        }
        }catch(error:any){
            next(error)
        }
    }
}