import {Channel} from 'amqplib'
import { buffer } from 'stream/consumers'

export default class Producer {
  constructor(private channel: Channel) {}

  async produceMessages(
    data: any,
    correlationId: string,
    replyToQueue: string
  ) {
    this.channel.sendToQueue(replyToQueue, Buffer.from(JSON.stringify(data)), {
      correlationId: correlationId, 
      replyTo: replyToQueue, 
    });
  }
}