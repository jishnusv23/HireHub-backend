
import { config } from 'dotenv'
config()
export default {
  rabbitMQ: {
    url:
      process.env.RABBITMQ_URL ||
      "amqps://wcrweiuo:kpZSsAj3se_hC-1EhHuNLI8A5WTXFt6J@goose.rmq2.cloudamqp.com/wcrweiuo",
  },
  queues: {
    authQueue: "authQueue",
    userQueue: "userQueue",
    notifQueue: "notifQueue",
    interviewQueue: "interviewQueue",
  },
};
console.log(process.env.RABBITMQ_URL);
// laoq qdbu epkk mkhq
