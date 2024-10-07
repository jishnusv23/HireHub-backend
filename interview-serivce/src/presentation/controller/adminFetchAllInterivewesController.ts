import { IDependancies } from "@/application/interface/IDependancies";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode ";
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
                  .status(HttpStatusCode.OK)
                  .json({
                    success: true,
                    data: response,
                    message: "Fetching all data successfully",
                  });
              } else {
                return res
                  .status(HttpStatusCode.BAD_REQUEST)
                  .json({ success: true, data: null, message: "invalid query" });
              }
        }catch(error:any){
            next(error)
        }
    }
}