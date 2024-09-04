import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { InterviewTimeDateValid } from "../../_lib/common/verifyInterview";

export const verifyInterviewController=(dependancies:IDependancies)=>{
    const {useCases:{IFetchCurrentInterveiwUseCases}}=dependancies
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body,'fetchInterview')
            const {uniqueId,userId}=req.body
            const response=await IFetchCurrentInterveiwUseCases(dependancies).execute(uniqueId,userId)
            console.log("🚀 ~ file: verifyInterviewController.ts:11 ~ returnasync ~ response:", response)
            if(response){
                const isValid=InterviewTimeDateValid(response.date,response.startTime as string)
                console.log("🚀 ~ file: verifyInterviewController.ts:15 ~ returnasync ~ isValid:", isValid)
                if(isValid){
                    console.log(isValid)
                    return res.status(200).json({success:true,message:'Interview is Valid'})
                }else{
                    return res
                      .status(400)
                      .json({
                        success: false,
                        messsage:
                          "Interview is not within the allowed time window",
                      });
                }
            }else{
                return res.status(404).json({success:false,message:'Not found the interview'})
            }

        }catch(error:any){
            next(error)
        }
    }
}