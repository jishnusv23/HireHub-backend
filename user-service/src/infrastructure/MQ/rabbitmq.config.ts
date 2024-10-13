import { config } from "dotenv";
config();
export default {
  rabbitMQ: {
    url:
      process.env.RABBITMQ_URL ||
      "amqps://mvvvvqcz:Xs4vPHkAD92FVZls-5Mr3rTs3IBMKfFF@goose.rmq2.cloudamqp.com/mvvvvqcz",
  },
  queues: {
    authQueue: "authQueue",
    userQueue: "userQueue",
    notifQueue: "notifQueue",
    interviewQueue: "interviewQueue",
  },
};

// laoq qdbu epkk mkhq
