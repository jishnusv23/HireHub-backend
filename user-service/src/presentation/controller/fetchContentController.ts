import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode ";
import { IDependancies } from "../../application/interface/IDependancies";
import { NextFunction, Request, Response } from "express";



export const fetchContentController=(depandancies:IDependancies)=>{
    const {useCases:{fetchAllContentUseCases}}=depandancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.query,'getting the query passing data')
             const page = req.query.page
               ? parseInt(req.query.page as string, 10)
               : undefined;

             const limit = req.query.limit
               ? parseInt(req.query.limit as string, 10)
               : undefined;

             //*page!!
             if (page !== undefined && isNaN(page)) {
               return res
                 .status(HttpStatusCode.BAD_REQUEST)
                 .json({ success: false, message: "Invalid Page Number" });
             }

             //* limiit!!
             if (limit !== undefined && isNaN(limit)) {
               return res
                 .status(HttpStatusCode.BAD_REQUEST)
                 .json({ success: false, message: "Invalid limit Number" });
             }

             const response=await fetchAllContentUseCases(depandancies).execute(page ,limit)
            //  console.log("🚀 ~ file: fetchContentController.ts:35 ~ returnasync ~ response:", response)
             if(response){
                res
        .status(HttpStatusCode.CREATED)
        .json({
          success: true,
          message: "Getting All Contents",
          data: response,
        });
             }else{
                res.status(HttpStatusCode.BAD_REQUEST).json({
                  success: false,
                  message: "Not getting blogs",
                  data: null,
                });
             }
        }catch(error:any){
            next(error)
        }
    }
}