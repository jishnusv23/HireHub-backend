import { config } from "dotenv";
import nodemailer from "nodemailer";

export const notifyInterview = async (
  NotifyData: any,
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
    const message = `
  <p>Dear ${participantEmail},</p>

  <p>We are pleased to inform you that you have been scheduled for an interview with HireHub. Below are the details of your interview:</p>

  <p><strong>Title:</strong> ${NotifyData.title}</p>
  <p><strong>Description:</strong> ${NotifyData.description}</p>
  <p><strong>Interview Type:</strong> ${NotifyData.interviewType}</p>
  <p><strong>Job Position:</strong> ${NotifyData.jobPosition}</p>
  <p><strong>Date:</strong> ${NotifyData.date}</p>
  <p><strong>Start Time:</strong> ${NotifyData.startTime}</p>

  <p>Please be prepared for the interview and ensure that you are available at the specified time.</p>

  <p>We look forward to your participation.</p>

  <p>Best regards,<br/>HireHub Team</p>
`;
    const mailOptions = {
      from: process.env.COMPANY_EMAIL,
      to: participantEmail,
      subject: `Interview Scheduled for ${NotifyData.jobPosition}`,
      html:message
    };
    const info = await transporter.sendMail(mailOptions);

    console.log(`Email sent to ${NotifyData.email}: ${info.messageId}`);

    return `Verification email sent to ${NotifyData.email}`;
  } catch (error: any) {
    console.error("Something wrong in interview Notification");

    throw new Error(error?.message);
  }
};
