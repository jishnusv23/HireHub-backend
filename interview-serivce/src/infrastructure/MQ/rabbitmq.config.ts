import { config } from "dotenv";
config();
export default {
  rabbitMQ: {
    url:
      process.env.RABBITMQ_URL ||
      "amqps://wjydjslj:IMXz7hq8aQBS6KeOUwA5hGJT7LvUu_qh@dog.lmq.cloudamqp.com/wjydjslj",
  },
  queues: {
    authQueue: "authQueue",
    userQueue: "userQueue",
    notifQueue: "notifQueue",
    interviewQueue: "interviewQueue",
  },
};
