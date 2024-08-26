import RabbitMQClient from './client';
import { createUser,findByEmail,verifyAccount,updatePassword } from '../database/monogoDB/repositories'

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
          case "verifyAcc":
           console.log("Data received for verifyAcc:", data);
            const { email } = data;
            response = await verifyAccount(email);
            break;
          case 'updatePass':
            console.log(data,'kokoko')
            
            response=await updatePassword(data.email,data.password)
            break
          case 'updateRoleInterviewer':
            console.log(data,'user id for update the role into interviewer')
            response=true
            break;

          default:
            response = { success: false, error: "Unknow operation" };
            console.log("unknown operation:", operation);

            break;
        }
        const rabbitMQClient = RabbitMQClient.getInstance()

        await rabbitMQClient.produce(response,correlationId,replyTo)

    }
}