export default {
  rabbitMQ: {
    url: process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672",
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
