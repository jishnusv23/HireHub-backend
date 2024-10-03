import { IDependancies } from "../interface/IDependancies";


export const usersFetchAdminUseCases=(dependancies:IDependancies)=>{
    const {repositories:{usersFetchAdmin}}=dependancies

    return {
        execute:async(id:string)=>{
            return usersFetchAdmin(id)
        }
    }
}