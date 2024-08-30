
import { NextFunction, Request, response, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";

export const updateInterveiweController=(dependacies:IDependancies)=>{
    const {useCases:{IUpdateUseCases}}=dependacies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log('interviewData',req.body)
            console.log('interviewer id',req.params)
            // const response=await IUpdateUseCases(dependacies).execute(req.body,req.params.id)

        }catch(error:any){
            next(error)
        }
    }
}