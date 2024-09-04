import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";

export const MeetVerifyAccessController=(dependancies:IDependancies)=>{
    const {}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.query,'meet validation')
        }catch(error:any){
            next(error)
        }
    }
}