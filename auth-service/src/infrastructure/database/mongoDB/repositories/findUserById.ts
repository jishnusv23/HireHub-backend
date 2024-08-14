import { User } from "../models";
import { UserEntities } from "../../../../domain/entities";

export const findUserById= async(id:string):Promise<UserEntities|null>=>{
    try{
        const exsistingUser=await User.findById(id)
        if(!exsistingUser){
            throw new Error('user is not valid')
        }
        return exsistingUser
    }catch(error:any){
        console.error(error?.message);
        return null
        
    }

}