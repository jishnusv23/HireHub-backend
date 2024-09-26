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


        }catch(error:any){

        }
    }
}