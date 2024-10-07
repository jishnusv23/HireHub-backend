import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode ";
import { IDependancies } from "../../application/interface/IDependancies";


export const updateHandClappController=(dependancies:IDependancies)=>{
    const {useCases:{updateHandClappUseCases}}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body,'handClappCounting getting')
            const {responseHandClap,blogId}=req.body

            const response=await updateHandClappUseCases(dependancies).execute(responseHandClap,blogId)
            if(response){
                return res.status(HttpStatusCode.OK).json({success:true,message:'successfully updateed'})
            }else{
                return res.status(HttpStatusCode.NOT_FOUND).json({success:false,message:'something invalid '})
            }
        }catch(error:any){
            next(error)
        }
    }

}