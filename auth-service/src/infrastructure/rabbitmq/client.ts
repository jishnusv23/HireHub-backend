    import {Channel,Connection,connect} from 'amqplib'
    import config from './rabbitmq.config'
    import Consumer from './consumer'
    import Producer from "./producer";
    import EventEmitter from 'events'


    class RabbitMQClient {
      private constructor() {}

      private static instance: RabbitMQClient | null = null;

      private isInitialized = false;

      private producer: Producer | undefined;
      private consumer: Consumer | undefined;
      private connection: Connection | undefined;
      private producerChannel: Channel | undefined;
      private consumerChannel: Channel | undefined;

      private eventEmitter: EventEmitter = new EventEmitter();

      public static async getInstance() {
        if (!this.instance) {
          this.instance = new RabbitMQClient();
          await this.instance.initialize();
        }
        return this.instance;
      }

      private async initialize() {
        if (this.isInitialized) {
          return;
        }
        try {
          this.connection = await connect(config.rabbitMQ.url);
          this.producerChannel = await this.connection.createChannel();

          this.consumerChannel = await this.connection.createChannel();

          const { queue: replyeQueueName } =
            await this.consumerChannel.assertQueue("", { exclusive: true });

          this.producer = new Producer(
            this.producerChannel,
            replyeQueueName,
            this.eventEmitter
          );

          this.consumer = new Consumer(
            this.consumerChannel,
            replyeQueueName,
            this.eventEmitter
          );
          this.consumer.consumeMessages();
          this.isInitialized = true;
        } catch (error) {
          console.error("rabbitmq iniitailised error:", error);
          throw new Error("Failed to initialize Rabbitmq client");
        }
      }
      userQueue = config.queues.authQueue
      notifQueue=config.queues.notifQueue

      public async produce(data: any, operation: string, to: string) {
        let toQueue: string = "";
        switch (to) {
          case "toUser":
            toQueue = this.userQueue;
            break;
          case 'toNotif':
            toQueue = this.notifQueue;
          default:
            console.log("Unknown operation", operation);
            break;
        }
        if (!this.isInitialized) {
          await this.initialize();
        }
        return this.producer?.producerMessages(data, operation, toQueue);
      }
    }
    export default RabbitMQClient