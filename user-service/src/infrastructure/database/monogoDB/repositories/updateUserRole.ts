import { User } from "../models";
import { UserEntities } from "../../../../domain/entities";
import { generateAccessToken } from "../../../../_lib/http/jwt/generateAccessToken";


export const updateRole = async (data: string): Promise<boolean | any> => {
  try {
    
    const updateRole = await User.findOneAndUpdate(
      { _id: data },
      { $set: { role: "interviewer" } },
      { new: true }
    );

   
    if (updateRole) {
      console.log("Updated user:", updateRole);

      
      const accessToken = generateAccessToken({
        _id: String(updateRole._id),
        email: updateRole.email,
        role: "interviewer",
      });
        
      console.log("Updated token:", accessToken);
      return { accessToken };
    }

    return false;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
