import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { executionServiceProvider } from "../../infrastructure/services/executionService";

export const submissionController=(dependancies:IDependancies)=>{
    const {}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body,'request body here __________________________')

        }catch(error:any){
            next(error)
        }
    }
}
