import { IDependancies } from "../interface/IDependancies"

export  const contentAcceptanceUseCases=(depandancies:IDependancies)=>{
        const {repositories:{contentAcceptance}}=depandancies


        return{
            execute:async(id:string,AdminAccept:boolean)=>{
                return await contentAcceptance(id,AdminAccept)
            }
        }
}