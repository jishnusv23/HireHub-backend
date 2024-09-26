import { NextFunction, Request, Response } from 'express'
import {IDependancies} from '../../application/interface/IDependancies'
 export const getAllQuestionsInterivewer=(dependancies:IDependancies)=>{
    const {useCases:{IGetAllQuestionUseCases}}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.user, "user token details"); 
            console.log(req.query,'geting the query data')
                const { page, limit, userId } = req.query;
                console.log("🚀 ~ file: getAllIQuestionForInteriviwerContorller.ts:11 ~ returnasync ~ page:", page)

            const response=await IGetAllQuestionUseCases(dependancies).execute(Number(page),Number(limit),userId as string)

            if (response) {
              return res
                .status(201)
                .json({
                  success: true,
                  data: response,
                  message: "Fetching all data successfully",
                });
            } else {
              return res
                .status(404)
                .json({ success: true, data: null, message: "invalid user" });
            }
        }catch(error:any){

        }
    }
}