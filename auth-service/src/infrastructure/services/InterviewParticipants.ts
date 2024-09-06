import RabbitMQClient from "../rabbitmq/client";

export const InterviewParticipants=async(email:string)=>{
    try{
        const client=await RabbitMQClient.getInstance()
        const response = await client.produce(
          email,
          "checkParticipants",
          "toInterview"
        );
        console.log("🚀 ~ file: InterviewParticipants.ts:11 ~ InterviewParticipants ~ response:", response)
        return response
    }catch(error:any){
        console.error('something wrong in InterviewParticipants services');
        throw new Error(error?.message)
        
    }
}