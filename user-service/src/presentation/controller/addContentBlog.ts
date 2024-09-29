import { NextFunction, Request, Response } from "express"
import { IDependancies } from "../../application/interface/IDependancies"



export const AddContentBlog=(dependancies:IDependancies)=>{
    const {useCases:{ICreateContentUseCases}}=dependancies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            console.log(req.body,'geting the fronend data in here______________________')
            console.log(req.user,'this is the current user_____________________________')
            const data={
                ...req.body,
                userId:req.user?._id as string
            }
            const response=await ICreateContentUseCases(dependancies).execute(data)
            if(!response){
                return res.status(400).json({success:false,message:'Invalid content data ',data:null}) 
            }else{
                return res.status(200).json({success:true,message:'successfull'})
            }

        }catch(error:any){
            next(error)
        }
    }
}