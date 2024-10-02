import { IDependancies } from "../interface/IDependancies";

export const IGeetAllInterivewesByIdUseCases=(dependancies:IDependancies)=>{
    const { repositories:{getAllInterivewesById}}=dependancies
    return {
        execute:async(id:string)=>{
            return await getAllInterivewesById(id)
        }
    }
}