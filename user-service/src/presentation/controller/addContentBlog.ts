import { NextFunction, Request, Response } from "express"
import { IDependancies } from "../../application/interface/IDependancies"



export const AddContentBlog=(dependancies:IDependancies)=>{
    const {useCases:{ICreateContentUseCases}}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body,'geting the fronend data in here______________________')
            console.log(req.user,'this is the current user_____________________________')

        }catch(error:any){
            next(error)
        }
    }
}