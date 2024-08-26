import { User } from "../models";
import { UserEntities } from "../../../../domain/entities";

export const updateRole=async(data:string):Promise<boolean|any>=>{
    try{
        const updateRole = await User.findOneAndUpdate(
          { _id: data },
          { $set: { role: "interviewer" } },
          {new:true}
        );
        if(updateRole){
            return true
        }
        return false

    }catch(error:any){
        throw new Error(error?.message)
    }
}