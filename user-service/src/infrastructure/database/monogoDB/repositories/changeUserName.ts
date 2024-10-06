import { UserEntities } from "@/domain/entities";
import { User } from "../models";

export const changeUserName = async (
  name: string,
  id: string
): Promise<UserEntities | null> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      { username: name }, 
      { new: true } 
    );

    if (updatedUser) {
      return updatedUser;
    }
    return null;
  } catch (error: any) {
    console.error("Error in changeUserName repository:", error);
    throw new Error(error?.message);
  }
};
