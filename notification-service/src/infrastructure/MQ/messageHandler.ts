import { verificationOtp,forgoPassMailHandler,InterviewNotification } from "../services";

import RabbitMQClient from "./client";


export default class MessageHandler {
  static async handle(
    operation: string,
    data: any,
    correlationId: string,
    replyTo: string
  ) {
    let response: any = "success";

    switch (operation) {
      case "verifyOtp":
        // console.log(data);
        const resutl=await verificationOtp(data)
        response={success:true,message:resutl}
       break;
    case 'forgotPassNotify':
      // console.log(data)
      const result=await forgoPassMailHandler(data)
      response={success:true,message:result}
      break

    case 'InterviewNofication':
      console.log(data,'inteview datas')
      response=await InterviewNotification(data)
      break;  

   default:
       response = { success: false, error: "Unknow operation" };
      console.log("unknown operation:", operation);
      break;
    }
    const rabbitMQClient = RabbitMQClient.getInstance();

    await rabbitMQClient.produce(response, correlationId, replyTo);
  }
}
