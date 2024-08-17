import { generateOTP } from "../../_lib/utils/otp/genarateOtp";
import { updateOTP } from "../database/mongoDB/repositories/updateOtp";
import RabbitMQClient from "../rabbitmq/client";

export const confirmOtpNotification=async(email:string)=>{
    try{
      const otp = await generateOTP();
      let otpDetails = {
        email,
        otp: otp,
      };
      const result = await updateOTP(otpDetails);
      console.log("🚀 ~ file: sendMaile.ts:13 ~ confirmOtpNotification ~ result:", result)
      let data={
          email:result?.email,
          otp:result?.otp
        }
        const client=await RabbitMQClient.getInstance()
        const response = await client.produce(data, "verifyOtp", "toNotif");
     
      console.log("🚀 ~ file: sendMaile.ts:21 ~ confirmOtpNotification ~ response:", response)
      return response
    }catch(err){

    }
}