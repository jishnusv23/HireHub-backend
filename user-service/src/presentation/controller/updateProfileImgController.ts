import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode ";
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
            if(response){
                return res.status(HttpStatusCode.OK).json({success:true,data:response,message:"Imge successfully updated"})
            }else{
                return res.status(HttpStatusCode.NOT_FOUND).json({success:true,data:null,message:'Something wrong'})
            }

        }catch(error:any){

        }
    }
}