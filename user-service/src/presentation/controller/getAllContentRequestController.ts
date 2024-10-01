import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";

export const getAllContentRequestController=(dependancies:IDependancies)=>{
    const {useCases:{getallContentRequestUseCases}}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const page = req.query.page
              ? parseInt(req.query.page as string, 10)
              : undefined;

            const limit = req.query.limit
              ? parseInt(req.query.limit as string, 10)
              : undefined;

            //*page!!
            if (page !== undefined && isNaN(page)) {
              return res
                .status(400)
                .json({ success: false, message: "Invalid Page Number" });
            }

            //* limiit!!
            if (limit !== undefined && isNaN(limit)) {
              return res
                .status(400)
                .json({ success: false, message: "Invalid limit Number" });
            }
            const response = await getallContentRequestUseCases(
              dependancies
            ).execute(page, limit);
            console.log(
              "🚀 ~ file: getAll.ts:34 ~ return ~ response:",
              response
            );
            res.status(201).json({
              success: true,
              message: "Getting All requestContent",
              data: response,
            });

        }catch(error:any){
            next(error)
        }
    }
}