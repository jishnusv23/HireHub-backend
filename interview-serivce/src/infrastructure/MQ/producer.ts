import { Channel } from "amqplib";

export default class Producer {
  constructor(private channel: Channel) {}

  async produceMessage(data: any, correlatioId: string, replyToQueue: string) {
    this.channel.sendToQueue(replyToQueue, Buffer.from(JSON.stringify(data)), {
      correlationId: correlatioId,
      replyTo:replyToQueue
    });
  }
}
