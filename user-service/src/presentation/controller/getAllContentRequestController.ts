import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";

export const getAllContentRequestController=(dependancies:IDependancies)=>{
    const {useCases:{getallContentRequestUseCases}}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.query,'geting the query here .>>>>>>>>>>>>>>>>>>>>>')

        }catch(error:any){
            next(error)
        }
    }
}