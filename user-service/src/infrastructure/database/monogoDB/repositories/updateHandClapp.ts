import { contentM } from "../models";

export const updateHandClapp=async(handClapp:number,id:string):Promise<string|null>=>{
    try{    
        const update=await contentM.updateOne({_id:id},{$set:{response:handClapp}},{$new:true})
        if(update){
            return 'successfully updated'
        }
        return null
    }catch(error:any){
        console.error('Something wrong updateHandClapp',error);
        throw new Error(error?.message)
    }
}