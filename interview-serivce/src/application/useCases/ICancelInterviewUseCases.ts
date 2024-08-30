import { IDependancies } from "../interface/IDependancies";

export const ICancelInterviewUseCases=(dependancies:IDependancies)=>{
    const {repositories:{cancelInterview}}=dependancies

    return {
        execute:async(id:string)=>{
            try{
                return await cancelInterview(id)
            }catch(error:any){
                console.error('Something wrong in cancelUsecases',error);
                throw new Error(error?.message)
                
            }
        }
    }
}