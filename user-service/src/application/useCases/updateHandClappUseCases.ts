import { IDependancies } from "../interface/IDependancies";


export const updateHandClappUseCases=(dependancies:IDependancies)=>{
    const {repositories:{updateHandClapp}}=dependancies
    
    return {
        execute:async(handClapp:number,id:string)=>{
            return await updateHandClapp(handClapp,id)
        }
    }
}