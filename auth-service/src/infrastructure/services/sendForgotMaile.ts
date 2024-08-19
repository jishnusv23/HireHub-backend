import { generateForgotPasswords } from "../../_lib/http/jwt";
import RabbitMQClient from "../rabbitmq/client";

export const SendForgotPassMail=async(email:string)=>{
    try{
        const token=generateForgotPasswords({email})
        console.log("🚀 ~ file: sendForgotMaile.ts:7 ~ SendForgotPassMail ~ token:", token)
        let data={
            email,
            token
        }
        const client=await RabbitMQClient.getInstance()
        const response = await client.produce(
          data,
          "forgotPassNotify",
          "toNotif"
        );

        return response

    }catch(error:any){  
        console.error('Someting wrong in auth sendMaileservice',error);
        throw new Error( error?.message)
        
    }

}