import RabbitMQClient from "../../../rabbitmq/client";
import { UserEntities } from "../../../../domain/entities";


export const updatePassword=async(email:string,password:string):Promise<UserEntities|any>=>{
    try{
        let response=null
        const data={
            email:email,
            password:password
        }
        console.log("🚀 ~ file: updatePassword.ts:12 ~ updatePassword ~ data:", data)
        const client=await RabbitMQClient.getInstance()
         response = client.produce(data, "updatePass", "toUser");
         if(!response){
            throw new Error('updatePassword Failed')
         }

        return response
    }catch(error:any){
         throw new Error(error?.message)
    }
}