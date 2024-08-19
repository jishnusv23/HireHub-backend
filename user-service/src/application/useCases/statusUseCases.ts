import { IDependancies } from "../interface/IDependancies";

export const statusUpdateUseCases = (dependancies: IDependancies) => {
    const {repositories:{statusUpdate}}=dependancies
    return {
        execute:async(id:string,isBlocked:boolean)=>{
            return await statusUpdate(id,isBlocked)
        }
    }
};
