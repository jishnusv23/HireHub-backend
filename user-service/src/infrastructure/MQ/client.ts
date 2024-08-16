import {Channel,Connection,connect} from 'amqplib'
import config from './rabbitmq.config'
import Consumer from './consumer'
import Producer from './producer'

class RabbitMQClient  {
  private constructor() {}

  private static instance: RabbitMQClient ;
  private isInitialised = false;

  private producer: Producer | undefined;
  private consumer: Consumer | undefined;
  private connection: Connection | undefined;
  private producerChannel: Channel | undefined;
  private consumerChannel: Channel | undefined;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new RabbitMQClient ();
    }
    return this.instance;
  }

  async initialise() {
    if (this.isInitialised) {
      return;
    }
    try {
      this.connection = await connect(config.rabbitMQ.url);

      this.producerChannel = await this.connection.createChannel();
      this.consumerChannel = await this.connection.createChannel();

      const { queue: authQueue } = await this.consumerChannel.assertQueue(
        config.queues.authQueue,
        { exclusive: true }
      );

      this.producer = new Producer(this.producerChannel);
      this.consumer = new Consumer(this.consumerChannel, authQueue);

      this.consumer.consumeMessages();

      this.isInitialised = true;
    } catch (err) {
      console.log("rabbit mq errror in", err);
    }
  }
  async produce(data: any, correlationId: string, replyToQueue: string){
    if(!this.isInitialised){
        await this.initialise()
    }
    if(this.producer){
        return await  this.producer?.produceMessages(data,correlationId,replyToQueue)
    }else{
        throw new Error('producer not initialised')
    }
  }
}
export default RabbitMQClient