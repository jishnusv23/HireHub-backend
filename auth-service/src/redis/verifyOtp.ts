import { Client } from "./redisClient";

export const verifyOTP = async (email: string, otp: string): Promise<any> => {
  try {
    const key = `otp:${email}`;
    const fetchUserOtp = await Client.get(key);
    console.log(
      "🚀 ~ file: verifyOtp.ts:7 ~ verifyOtp ~ fetchUserOtp:",
      fetchUserOtp
    );
    if (fetchUserOtp === otp) {
      console.log("working ");
      return true
    } else {
      console.log("something wron");
      return false
    }
  } catch (error: any) {
    console.error("Something wrong in verifyotp", error);
    throw new Error(error?.message);
  }
};
