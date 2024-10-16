import { IDependancies } from "../../application/interface/IDependancies";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode";
import { confirmOtpNotification } from "../../infrastructure/services/sendMaile";
import { Request,Response,NextFunction } from "express";

export const GenerateOneTimePasss=(dependancies:IDependancies)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body)
            const { email } = req.body;
            const resutl=await confirmOtpNotification(email)
            console.log("🚀 ~ file: oneTime-pass.ts:10 ~ returnasync ~ resutl:", resutl)
            res
              .status(HttpStatusCode.OK)
              .json({ success: true, data: {}, message: "Email send" });
            

        }catch(error:any){
            next(error)

        }
    }

}