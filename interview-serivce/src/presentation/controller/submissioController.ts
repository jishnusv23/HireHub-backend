import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { executionServiceProvider } from "../../infrastructure/services/executionService";

export const submissionController=(dependancies:IDependancies)=>{
  

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body,'request body here __________________________')
            const response=await executionServiceProvider(req.body.data)
            console.log("🚀 ~ file: submissioController.ts:12 ~ returnasync ~ response:", response)

        }catch(error:any){
            next(error)
        }
    }
}
