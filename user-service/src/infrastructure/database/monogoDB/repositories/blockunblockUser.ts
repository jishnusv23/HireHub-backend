import { UserEntities } from "../../../../domain/entities";
import { User } from "../models";

export const blockunblockUser = async (
  _id: string,
  isBlocked: boolean
): Promise<UserEntities | null> => {
  try {
    console.log('repo',_id,isBlocked,'gotit')
    const updateUser = await User.findByIdAndUpdate(
      _id,
      { isBlocked },
      { new: true }
    );
    if (!updateUser) {
      return null;
    }
    return updateUser;
  } catch (error: any) {
    console.error("something wrong in blockunblock repo");
    throw new Error(error?.message);
  }
};
