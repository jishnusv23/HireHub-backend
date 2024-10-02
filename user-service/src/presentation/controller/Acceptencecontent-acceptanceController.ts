import { IDependancies } from "@/application/interface/IDependancies";
import { NextFunction, Request, Response } from "express";


export const contentAcceptanceController=(dependancies:IDependancies)=>{
    const {useCases:{contentAcceptanceUseCases}}=dependancies


    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
                console.log(req.body,'hre is the tha data geting')
                const {id,AdminAccept}=req.body
                 if (!id || typeof AdminAccept !== "boolean") {
                   return res
                     .status(400)
                     .json({ success: false, message: "Invalid data" });
                 }

                 const response = await contentAcceptanceUseCases(
                   dependancies
                 ).execute(id, AdminAccept);
                 console.log(
                   "🚀 ~ file: blockunblockContorller.ts:19 ~ return ~ response:",
                   response
                 );
                 if (response) {
                   return res.status(200).json({
                     success: true,
                     data: response,
                     message: "Accepted updated successfully",
                   });
                 } else {
                   return res
                     .status(404)
                     .json({ success: false, message: "Content not found" });
                 }
        }catch(error){
            next(error)
        }
    }
}