import { config } from "dotenv";
config()
export default {
  rabbitMQ: {
    url:
      process.env.RABBITMQ_URL ||
      "amqps://apdcxvjw:BNV_My9Ujf_uKBytlYdQAFxChX8TmE5J@ostrich.lmq.cloudamqp.com/apdcxvjw",
  },
  queues: {
    authQueue: "authQueue",
    userQueue: "userQueue",
    notifQueue: "notifQueue",
    interviewQueue: "interviewQueue",
  },
};
