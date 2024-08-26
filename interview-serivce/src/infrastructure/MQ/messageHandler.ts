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
      case "createUser":
        console.log(data);
       

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
