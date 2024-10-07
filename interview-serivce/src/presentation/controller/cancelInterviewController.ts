import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode ";
import { sendCancelNotifyInform } from "../../infrastructure/services/sendCancelNotifyInform";


export const cancelInterveiwController=(dependancies:IDependancies)=>{
    const {useCases:{ICancelInterviewUseCases}}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body, "intervieweID");
            const {data}=req.body

            const response=await ICancelInterviewUseCases(dependancies).execute(data)
            console.log("🚀 ~ file: cancelInterviewController.ts:13 ~ returnasync ~ response:", response)
            if(response){
                const toNotifCancelInterveiw=await sendCancelNotifyInform(response)
                if(toNotifCancelInterveiw){

                    return res.status(HttpStatusCode.OK).json({success:true,data:response,message:'Interview Canceled'})
                }
            }

            return res.status(HttpStatusCode.BAD_REQUEST).json({success:true,data:null,message:'Invalid Interviewer'})
            

        }catch(error:any){  
            next(error)
        }
    }
}