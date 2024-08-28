import { User } from "../models";
import { UserEntities } from "../../../../domain/entities";
import {generateAccessToken} from 'hirehub-middleware-version'
export const updateRole=async(data:string):Promise<boolean|any>=>{
    try{
        const updateRole = await User.findOneAndUpdate(
          { _id: data },
          { $set: { role: "interviewer" } },
          {new:true}
        );
        if(updateRole){
            const token=await generateAccessToken({
                _id:String(updateRole._id),
                email:updateRole.email,
                role:updateRole.role
            })
        console.log('updated token',token)
            return true
        }
        return false

    }catch(error:any){
        throw new Error(error?.message)
    }
}