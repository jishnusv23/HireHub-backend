import { interview } from "../database/monogoDB/models";
import cron from "node-cron";

export const reminderInteriview = async () => {
  try {
    const now = new Date();
    const fifteenMinuteLater = new Date(now.getTime() + 15 * 60000);

    const interivews = await interview.find({ startTime: {} });
  } catch (error: any) {}
};
