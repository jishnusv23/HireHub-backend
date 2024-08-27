import { config } from "dotenv";
import nodemailer from "nodemailer";

export const notifyInterview = async (
  notificationData: any,
  participantEmail: string
): Promise<string> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.COMPANY_EMAIL,
        pass: process.env.COMPANY_PASSWORD,
      },
    });

    return 'fksfjs'
    
  } catch (error: any) {
    console.error("Something wrong in interview Notification");

    throw new Error(error?.message);
  }
};
