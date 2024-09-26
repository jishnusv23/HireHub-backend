import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";

export const AddQuestionController=(dependancies:IDependancies)=>{
    const {}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body,'add question geting request')

        }catch(error:any){
            next(error)
        }
    }
}