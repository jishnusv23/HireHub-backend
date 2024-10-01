import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";


export const updateHandClappController=(dependancies:IDependancies)=>{
    const {useCases:{updateHandClappUseCases}}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body,'handClappCounting getting')
            const {responseHandClap,blogId}=req.body

            const response=await updateHandClappUseCases(dependancies).execute(responseHandClap,blogId)
            if(response){
                return res.status(200).json({success:true,message:'successfully updateed'})
            }else{
                return res.status(400).json({success:false,message:'something invalid '})
            }
        }catch(error:any){
            next(error)
        }
    }

}