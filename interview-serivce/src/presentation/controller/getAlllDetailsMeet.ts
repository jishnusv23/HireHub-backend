import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";

export const getAllMeetDetailsController=(dependacies:IDependancies)=>{
    const {useCases:{IGetAllMeetDetailsUseCases}}=dependacies
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.user,'user token details')

        console.log(req.query, "its getting in backend perfectly");
        console.log("l");
        }catch(errror:any){
            next(errror)
        }
    }
}