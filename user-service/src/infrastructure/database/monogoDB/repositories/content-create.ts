import { contentEntities } from "../../../../domain/entities";
import { contentM } from "../models";

export const contentCreate=async(data:contentEntities):Promise<contentEntities|null>=>{
    console.log("🚀 ~ file: content-create.ts:5 ~ contentCreate ~ data:", data)
    try{
    const saveContentData=await contentM.create(data)
    if(!saveContentData){
        throw new Error('contenet creattion failed')
    }else{
        
        return saveContentData
    }
    }catch(error:any){
        throw new Error(
error?.message
        )
    }
}
