import { UserEntities } from "../.../../../../../domain/entities";
import { User } from "../models";

export const verifyAccount=async(email:string):Promise<UserEntities|null>=>{
    try{
        let user =null
        console.log(email)
        if(email){
            user=await User.findOneAndUpdate({email:email},{isVerified:true},{new:true})
            return user
        }
        return user
    }catch(error:any){
        console.error("Something woron account verifying time ",error);
        throw new Error(error?.message)
        
    }


}