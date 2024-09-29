
import { contentEntities } from "@/domain/entities";
import { IDependancies } from "../interface/IDependancies";

export const ICreateContentUseCases=(dependancies:IDependancies)=>{
    const {repositories:{contentCreate}}=dependancies

    return {
        execute:async(data:contentEntities)=>{
            return await contentCreate(data)
        }
    }
}