import { Otp } from "../models/otpModel";
import { UserEntities } from "../../../../domain/entities";
import { User } from "../models";

export const verifyOtp = async (
  email: string,
  otp: string
): Promise<UserEntities | null> => {
  try {
    const verifyed = await Otp.findOne({ email: email, otp: otp });
    if (verifyed) {
      const user = await User.findOne({ email: email });
      return user;
    }
    return null
  } catch (error: any) {
    console.error("Something wrong in verifyotp", error);

    return null;
  }
};
