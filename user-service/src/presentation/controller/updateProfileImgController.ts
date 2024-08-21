import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";


export const updateProfileImgController=(dependancies:IDependancies)=>{
    const {useCases:{updateProfileUseCases}}=dependancies

    return async (req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body)


            const response = await updateProfileUseCases(dependancies).execute(
              req.body.email,
              req.body.url
            );

        }catch(error:any){

        }
    }
}