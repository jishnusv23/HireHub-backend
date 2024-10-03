import { IDependancies } from "@/application/interface/IDependancies";
import { NextFunction, Request, Response } from "express";

export const AdminFetchInterivewesController=(dependancies:IDependancies)=>{
    const {useCases:{IAdminFetchInterivewesUseCases}}=dependancies
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.query,'geting the query successfully------------------------------------')
             const { page, limit } = req.query;
             const response = await IAdminFetchInterivewesUseCases(
               dependancies
             ).execute(Number(page), Number(limit));
              if (response) {
                return res
                  .status(200)
                  .json({
                    success: true,
                    data: response,
                    message: "Fetching all data successfully",
                  });
              } else {
                return res
                  .status(400)
                  .json({ success: true, data: null, message: "invalid query" });
              }
        }catch(error:any){
            next(error)
        }
    }
}