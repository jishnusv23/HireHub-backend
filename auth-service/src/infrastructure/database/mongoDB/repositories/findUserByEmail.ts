import { UserEntities } from "@/domain/entities";
import { User } from "../models";

export const findUserByEmail = async (
  email: string
): Promise<UserEntities|null> => {
    try{
        const existigUsers=await User.findOne({email})
        return existigUsers
    }catch(error:any){
        throw new Error(error?.message)
    }
};
