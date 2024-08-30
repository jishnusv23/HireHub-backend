import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";


export const cancelInterveiwController=(dependancies:IDependancies)=>{
    const {useCases:{ICancelInterviewUseCases}}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body, "intervieweID");

        }catch(error:any){
            next(error)
        }
    }
}