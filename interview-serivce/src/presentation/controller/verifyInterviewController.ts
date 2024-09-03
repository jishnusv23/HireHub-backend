import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { InterviewTimeDateValid } from "@/_lib/common/verifyInterview";

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
                if(isValid){
                    console.log(isValid)
                }
            }

        }catch(error:any){
            next(error)
        }
    }
}