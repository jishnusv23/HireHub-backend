import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";


export const usersFetchAdminController=(dependancies:IDependancies)=>{
    const {useCases:{usersFetchAdminUseCases}}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.params,'geting params here ______________________________________')
        }catch(error:any){
            next(error)
        }
    }
}