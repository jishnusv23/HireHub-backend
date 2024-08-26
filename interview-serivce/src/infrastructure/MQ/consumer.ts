import { Channel, ConsumeMessage } from "amqplib";
import EventEmitter from "events";

const eventEmitter = new EventEmitter();

export default class Consumer {
  constructor(
    private channel: Channel,
    private replyQueueName: string,
    private eventEmitter: EventEmitter
  ) {}

  async consumeMessages() {
    console.log("Get ready to consume message");

    this.channel.consume(
      this.replyQueueName,
      (message: ConsumeMessage | null) => {
        if (message !== null) {
          const correlationId = message.properties?.correlationId;
          const content = message.content?.toString();

          if (correlationId && content) {
            this.eventEmitter.emit(correlationId.toString(), content);
          } else {
            console.error(
              "Received a message with missing properties:",
              message
            );
          }
        } else {
          console.log("Consume is empty, no messages");
        }
      },
      {
        //*no acknowledgment
        noAck: true,
      }
    );
  }
}
