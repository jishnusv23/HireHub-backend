import { config } from "dotenv";
config();
export default {
  rabbitMQ: {
    url:
      process.env.RABBITMQ_URL ||
      "amqp://guest:guest@rabbitmq.default.svc.cluster.local:5672",
  },
  queues: {
    authQueue: "authQueue",
    userQueue: "userQueue",
    notifQueue: "notifQueue",
    interviewQueue: "interviewQueue",
  },
};
