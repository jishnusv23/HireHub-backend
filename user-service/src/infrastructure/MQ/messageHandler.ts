import RabbitMQClient from './client';
import { createUser,findByEmail,verifyAccount } from '../database/monogoDB/repositories'

export default class MessageHandler{
    static async handle(operation:string,data:any,correlationId:string,replyTo:string){
        let response:any='success'

        switch (operation) {
          case "createUser":
            console.log(data);
            response = await createUser(data);

            break;
          case "checkMail":
            response = await findByEmail(data);
            break;
          case 'verifyAcc':
            const {email}=data
            response=await verifyAccount(email)
            break

          default:
            response = { success: false, error: "Unknow operation" };
            console.log("unknown operation:", operation);

            break;
        }
        const rabbitMQClient = RabbitMQClient.getInstance()

        await rabbitMQClient.produce(response,correlationId,replyTo)

    }
}