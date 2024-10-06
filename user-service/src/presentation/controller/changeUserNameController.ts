import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode ";

 export const ChangeUserNameController=(dependancies:IDependancies)=>{
    const {useCases:{changeUserNameUseCase}}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body,'_________________geting the username')
            const {name}=req.body
            console.log(req.user,'___JWT')
            const response=await changeUserNameUseCase(dependancies).execute(name,req.user?._id as string)
            console.log("🚀 ~ file: changeUserNameController.ts:13 ~ returnasync ~ response:", response)
            if(response){
                return res.status(HttpStatusCode.OK).json({success:true,data:response,message:"updated_successfully"})
            }else{
                return res.status(HttpStatusCode.NOT_FOUND).json({success:true,data:null,message:"user not found"})
            }
            
        }catch(error:any){
            next(error)
        }
    }
}