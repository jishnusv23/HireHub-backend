import { UserEntities } from "../../../../domain/entities";
import { User } from "../models";

export const blockunblockUser = async (
  id: string,
  isBlocked: boolean
): Promise<UserEntities | null> => {
  try {
    const updateUser = await User.findByIdAndUpdate(id,{isBlocked},{new:true});
    if(!updateUser){
        return null
    }
    return updateUser
  } catch (error: any) {
    console.error("something wrong in blockunblock repo");
    throw new Error(error?.message)
  }
};
