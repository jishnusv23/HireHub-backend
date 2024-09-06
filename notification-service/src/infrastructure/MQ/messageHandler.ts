import { verificationOtp,forgoPassMailHandler,InterviewNotification,CancelInterviewNotificationHandler } from "../services";

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
        const resutl = await verificationOtp(data);
        response = { success: true, message: resutl };
        break;
      case "forgotPassNotify":
        // console.log(data)
        const result = await forgoPassMailHandler(data);
        response = { success: true, message: result };
        break;

      case "InterviewNofication":
        console.log(data, "inteview datas");
        const resutlIn = await InterviewNotification(data);
        response = { success: true, message: resutlIn };
        console.log(
          "🚀 ~ file: messageHandler.ts:31 ~ MessageHandler ~ response:",
          response
        );
        break;
      case "cancelInterview":
        console.log(data, "inteview  for cancel notification");
        // const resutlIn = await InterviewNotification(data);
        // response = { success: true, message: resutlIn };
        // console.log(
        //   "🚀 ~ file: messageHandler.ts:31 ~ MessageHandler ~ response:",
        //   response
        // );
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
