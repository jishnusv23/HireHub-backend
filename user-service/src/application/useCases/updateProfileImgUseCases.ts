import { IDependancies } from "../interface/IDependancies";

export const updateProfileUseCases=(dependacies:IDependancies)=>{
    const {repositories:{updaetProfileImage}}=dependacies
    return {
    execute:async(email:string,url:string)=>{
        console.log(email,url,'UseCases')
        return await updaetProfileImage(email,url)
    }

    }
}