import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";

export const verifyInterviewController=(dependancies:IDependancies)=>{
    const {useCases:{IFetchCurrentInterveiwUseCases}}=dependancies
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body,'fetchInterview')

        }catch(error:any){
            next(error)
        }
    }
}