import { config } from "dotenv";
config()
export default {
  rabbitMQ: {
    url: process.env.RABBITMQ_URL
  },
  queues: {
    authQueue: "authQueue",
    userQueue: "userQueue",
    notifQueue: "notifQueue",
    interviewQueue: "interviewQueue",
  },
};
console.log(process.env.RABBITMQ_URL);