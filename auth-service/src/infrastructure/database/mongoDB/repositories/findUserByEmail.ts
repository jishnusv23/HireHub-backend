import { UserEntities } from "@/domain/entities";
import { User } from "../models";
import RabbitMQClient from "../../../rabbitmq/client";

export const findUserByEmail = async (
  email: string
): Promise<UserEntities|any> => {
    try{
        let result=null
        const client= await RabbitMQClient.getInstance()
        result=await client.produce(email,'checkMail','toUser')
        // const existigUsers=await User.findOne({email})
        // return existigUsers
        return result
    }catch(error:any){
        throw new Error(error?.message)
    }
};
