import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";


export const updateHandClappController=(dependancies:IDependancies)=>{
    const {useCases:{updateHandClappUseCases}}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body,'handClappCounting getting')
        }catch(error:any){
            next(error)
        }
    }

}