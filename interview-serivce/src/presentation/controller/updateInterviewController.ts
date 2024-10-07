
import { NextFunction, Request, response, Response } from "express";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode ";
import { IDependancies } from "../../application/interface/IDependancies";
import { sendInterviewNotify } from "../../infrastructure/services/sendNotify";

export const updateInterveiweController=(dependacies:IDependancies)=>{
    const {useCases:{IUpdateUseCases}}=dependacies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log('interviewData',req.body)
            console.log('interviewer id',req.params)
            const {id}=req.params
            const response=await IUpdateUseCases(dependacies).execute(req.body,id)
            if(response){
                const information=await sendInterviewNotify(response)
                if(information){
                    return res.status(HttpStatusCode.OK).json({success:true,data:response,message:'successfully updated'})
                }
            }
            return res.status(HttpStatusCode.NOT_FOUND).json({success:false,data:null,message:'Invalid Form data'})
        }catch(error:any){
            next(error)
        }
    }
}