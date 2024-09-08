import { interview } from "../database/monogoDB/models";
import cron from "node-cron";

export const reminderInteriview = async () => {
  try {
    const now = new Date();
    // const fifteenMinuteLater = new Date(now.getTime() + 15 * 60000);
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate()+1);

    const interivews = await interview.find({
      date: { $gte: todayStart, $lt: todayEnd },
      interviewStatus: "Scheduled",
      reminded: { $ne: true },
    });
  } catch (error: any) {}
};
