import { UserEntities } from "../../../../domain/entities";
import { User } from "../models";

export const updatePassword=async(email:string,password:string):Promise<UserEntities|null>=>{
    try{
        console.log(email,password,'auth data')
        const updateUser=await User.findOneAndUpdate({email:email},{password:password},{new:true})
        if(!updateUser){
            return null
        }
        return updateUser

    }catch(error:any){
        console.error("something wrong in updatepass repo");
        throw new Error(error?.message);
    }

}