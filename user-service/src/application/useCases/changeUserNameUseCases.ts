import { IDependancies } from "../interface/IDependancies";

export const changeUserNameUseCase=(dependancies:IDependancies)=>{
    const {repositories:{changeUserName}}=dependancies
    
    return {
        execute:async(name:string,id:string)=>{
            return await changeUserName(name,id)
        }
    }
}