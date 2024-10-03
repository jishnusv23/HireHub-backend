import { IDependancies } from "@/application/interface/IDependancies";
import { NextFunction, Request, Response } from "express";

export const AdminFetchInterivewesController=(dependancies:IDependancies)=>{
    const {useCases:{IAdminFetchInterivewesUseCases}}=dependancies
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.query,'geting the query successfully------------------------------------')
        }catch(error:any){
            next(error)
        }
    }
}