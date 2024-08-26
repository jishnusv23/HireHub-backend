import { InterviewEntity } from "../../domain/entities";
import RabbitMQClient from "../MQ/client";

export const sendInterviewNotify = async(data: InterviewEntity) => {
    try{
        const client=await RabbitMQClient.getInstance()
        const response=await client.produce(data,'InterviewNofication','toNotif')
        return response
    }catch(error:any){
        console.error('Something wrong in interview notify sending function',error);
        
    }
    
};
