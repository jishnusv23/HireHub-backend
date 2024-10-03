import { UserEntities } from "@/domain/entities";
import { User } from "../models";

export const usersFetchAdmin=async(id:string):Promise<UserEntities[]|null>=>{
    try{
        const allUsers=await User.find({_id:{$ne:id}})
        if(allUsers){
            return allUsers
        }else{
            return null
        }
    }catch(error:any){
        console.error('something wrong in usersFetchAdmin',error);
        throw new Error(error?.message)
        
    }
}