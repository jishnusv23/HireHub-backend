import { IDependancies } from "../interface/IDependancies";

export  const blockunblockUseCases=(dependancies:IDependancies)=>{
    const {repositories:{blockunblockUser}}=dependancies

    return {
        execute:async(id:string,isBlocked:boolean)=>{
            return await blockunblockUser(id,isBlocked)
        }
    }

}