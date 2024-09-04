import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";

export const MeetVerifyAccessController=(dependancies:IDependancies)=>{
    const {useCases:{IMeetAccessIntervieweeUseCases}}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.query,'meet validation')
            const response=await IMeetAccessIntervieweeUseCases(dependancies).execute(req.query.uniqueId as string)
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
        }catch(error:any){
            next(error)
        }
    }
}