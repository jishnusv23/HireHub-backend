import { error } from "console";
import { InterviewEntity } from "../../domain/entities";
import RabbitMQClient from "../MQ/client";

export const sendCancelNotifyInform=async(data:InterviewEntity)=>{
    try{
        const client=await RabbitMQClient.getInstance()
        const response = await client.produce(
          data,
          "cancelInterview",
          "toNotif"
        )
        return response
    }catch(error:any){
        console.error('something wrong in sendCancelNotifyservice',error)
        throw new Error(error?.message)
        
    }
}