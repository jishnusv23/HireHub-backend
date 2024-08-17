import { Otp } from "../models/otpModel";
import { UserEntities } from "../../../../domain/entities";

export const verifyOtp = async (
  email: string,
  otp: string
): Promise<boolean> => {
  try {
    const verifyed = await Otp.findOne({ email: email, otp: otp });
    // if (verifyed) {

    // }
    return verifyed !== null;
  } catch (error: any) 
  {
    console.error('Something wrong in verifyotp',error);
    
    return false
  }
};
