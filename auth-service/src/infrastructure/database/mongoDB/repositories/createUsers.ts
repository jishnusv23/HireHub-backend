import { UserEntities } from "@/domain/entities";
import { User } from "../models";
import RabbitMQClient from "../../../rabbitmq/client";

export const createUser = async (data:UserEntities): Promise<UserEntities | any> => {
    try{
        let newUser=null
        const client = await RabbitMQClient.getInstance();
        newUser = await client.produce(data, "createUser", "toUser");
        if(!newUser){
            throw new Error('User creation failed')
        }
        return newUser;
    }catch(error:any){
        
        throw new Error(error?.message)
    }
};
