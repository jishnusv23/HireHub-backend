import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";

export const AddQuestionController=(dependancies:IDependancies)=>{
    const {useCases:{IAddquestionUseCases}}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body,'add question geting request')
            const response=await IAddquestionUseCases(req.body)
            console.log("🚀 ~ file: AddQuestionController.ts:11 ~ returnasync ~ response:", response)
            if(response){
                return res.status(200).json({success:true,data:response})
            }else{
                return res.status(404).json({success:false,message:"question or type is not getting something problem "})
            }

        }catch(error:any){
            next(error)
        }
    }
}