import { Otp } from "../models/otpModel";
import { UserEntities } from "../../../../domain/entities";

import RabbitMQClient from "../.../../../../rabbitmq/client";
import { verifyOTP } from "../../../../redis/verifyOtp";

export const verifyOtp = async (
  datas: UserEntities,
  otp: string
): Promise<UserEntities | any> => {
  try {
    
    const verifyed = await verifyOTP(datas.email,otp)
    console.log("🚀 ~ file: verifyOtp.ts:13 ~ verifyed:", verifyed)
    if (verifyed) {
       const client= await RabbitMQClient.getInstance()
       const result = await client.produce(datas, "createUser", "toUser");
       return result as UserEntities

    }
   return null
  } catch (error: any) {
    console.error("Something wrong in verifyotp", error);

    return null;
  }
};
