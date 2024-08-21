import { UserEntities } from "../../../../domain/entities";
import { User } from "../models";

export const updaetProfileImage=async(email:string,url:string):Promise<UserEntities|null>=>{
    try{
        console.log(email,url,'is getting repo')
        const udpateImg = await User.findOneAndUpdate(
          { email: email },
          { $set: { "profile.avatar": url } },
          { new: true }
        );
        if(udpateImg){
            return udpateImg
        }
        return null

    }catch(error:any){
        console.error("something wrong in updateImg",error);
        throw new Error(error?.message)
        
    }
}