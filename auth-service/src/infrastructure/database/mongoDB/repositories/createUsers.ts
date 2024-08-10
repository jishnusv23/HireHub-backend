import { UserEntities } from "@/domain/entities";
import { User } from "../models";

export const createUser = async (data:UserEntities): Promise<UserEntities | null> => {
    try{
        const newUser=await User.create(data)
        if(!newUser){
            throw new Error('User creation failed')
        }
        return newUser
    }catch(error:any){
        throw new Error(error?.message)
    }
};
