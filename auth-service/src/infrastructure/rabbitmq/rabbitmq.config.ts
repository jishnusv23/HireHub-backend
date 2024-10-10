
export default {
  rabbitMQ: {
    url:
      process.env.RABBITMQ_URL ||
      "amqps://mskssqum:VTeOg6PCkmN_LJ1w6-wVbCewR3iBU-iP@ostrich.lmq.cloudamqp.com/mskssqum",
  },
  queues: {
    authQueue: "authQueue",
    userQueue: "userQueue",
    notifQueue: "notifQueue",
    interviewQueue: "interviewQueue",
  },
};
