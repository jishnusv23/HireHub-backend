import { interview } from "../database/monogoDB/models";
import cron from "node-cron";
import RabbitMQClient from "../MQ/client";

 const reminderInteriview = async () => {
  try {
    const now = new Date();
    // const fifteenMinuteLater = new Date(now.getTime() + 15 * 60000);
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    const interviews = await interview.find({
      date: { $gte: todayStart, $lt: todayEnd },
      interviewStatus: "Scheduled",
      reminded: { $ne: true },
    });

    //iterate the interviews
    for (const interview of interviews) {
      const [hours, minutes]: [number, number] = interview.startTime
        ?.split(":")
        .map(Number) as [number, number];
      const interviewDateTime = new Date(interview.date);
      interviewDateTime.setHours(hours, minutes, 0, 0);

      const reminderTime = new Date(interviewDateTime.getTime() - 15 * 60000);

      if (now >= reminderTime && now < interviewDateTime) {
        // console.log(
        //   `Sending the reminder for the interivew ${interview.participants} and the time was ${interview.startTime}`
        // );
        const client=await RabbitMQClient.getInstance()
        const response = await client.produce(
          interview,
          "reminderInterview",
          "toNotif"
        );
        interview.reminded = true;
        await interview.save();
      }
    }
    console.log(`proceed interivew ${interview.length}`);
  } catch (error: any) {
    console.error(
      `someting wrong in interivewReminder cronjob function`,
      error
    );
    throw new Error(error?.message);
  }
};

export const setupCronJobs = () => {
  cron.schedule("*/30 * * * *", () => {
    console.log(
      "Running interview reminder cron job at:",
      new Date().toISOString()
    );
    reminderInteriview();
  });
  console.log("Cron job for interview reminders has been set up");
};
