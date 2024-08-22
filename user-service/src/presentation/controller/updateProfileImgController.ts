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
            if(response){
                return res.status(201).json({success:true,data:response,message:"Imge successfully updated"})
            }else{
                return res.status(404).json({success:true,data:null,message:'Something wrong'})
            }

        }catch(error:any){

        }
    }
}