import { generateOTP } from "../../_lib/utils/otp/genarateOtp";
import { updateOTP } from "../database/mongoDB/repositories/updateOtp";
import RabbitMQClient from "../rabbitmq/client";
import { storeOtp } from "./storeOtp";

export const confirmOtpNotification=async(email:string)=>{
    try{
      const otp = await generateOTP();
      
      await storeOtp(email,otp);
      // console.log("🚀 ~ file: sendMaile.ts:13 ~ confirmOtpNotification ~ result:", result)
      let data={
          email,
          otp
        }
        const client=await RabbitMQClient.getInstance()
        const response = await client.produce(data, "verifyOtp", "toNotif");
     
      console.log("🚀 ~ file: sendMaile.ts:21 ~ confirmOtpNotification ~ response:", response)
      return response
    }catch(err){

    }
}