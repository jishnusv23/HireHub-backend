import { IDependancies } from "@/application/interface/IDependancies";
import { NextFunction, Request, Response } from "express";


export const contentAcceptanceController=(dependancies:IDependancies)=>{
    const {useCases:{contentAcceptanceUseCases}}=dependancies


    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
                console.log(req.body,'hre is the tha data geting')
        }catch(error){
            next(error)
        }
    }
}