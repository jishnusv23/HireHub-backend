import { Channel, ConsumeMessage } from "amqplib";

export default class Consumer {
  constructor(private channel: Channel, private rpcQueue: string) {}
  async consumeMessages() {
    console.log("Ready to consume message....................");

    this.channel.consume(
      this.rpcQueue,
      async (message: ConsumeMessage | null) => {
        if (message !== null) {
          const { correlationId, replyTo } = message?.properties || {};
          const operation = message?.properties?.headers?.function;
          if (!correlationId || !replyTo) {
            console.log(
              "correlationId or replyto is missing .........................👽"
            );
          }
          const data = JSON.parse(message.content.toString());
        }
      },
      {
        noAck: true,
      }
    );
  }
}
