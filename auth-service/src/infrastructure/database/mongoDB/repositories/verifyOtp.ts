import { Otp } from "../models/otpModel";
import { UserEntities } from "../../../../domain/entities";

import RabbitMQClient from "../.../../../../rabbitmq/client";

export const verifyOtp = async (
  email: string,
  otp: string
): Promise<UserEntities | any> => {
  try {
    let result=null
    const verifyed = await Otp.findOne({ email: email, otp: otp });
    if (verifyed) {
       const client= await RabbitMQClient.getInstance()
        result = await client.produce({email}, "verifyAcc", "toUser");
       return result

    }
    return result
  } catch (error: any) {
    console.error("Something wrong in verifyotp", error);

    return null;
  }
};
