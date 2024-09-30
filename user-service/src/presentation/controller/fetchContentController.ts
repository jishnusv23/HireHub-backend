import { IDependancies } from "@/application/interface/IDependancies";
import { NextFunction, Request, Response } from "express";



export const fetchContentController=(depandancies:IDependancies)=>{
    const {}=depandancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.query,'getting the query passing data')
        }catch(error:any){
            next(error)
        }
    }
}