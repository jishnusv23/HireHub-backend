import { IDependancies } from "../../application/interface/IDependancies";
import { Request,Response,NextFunction } from "express";

export const SchedulInterviewController=(dependancies:IDependancies)=>{
    const {useCases:{IScheduleUseCases}}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body)
        }catch(error:any){
            next(error)
        }
    }
}