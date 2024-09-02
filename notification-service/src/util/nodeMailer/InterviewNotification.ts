import { config } from "dotenv";
import nodemailer from "nodemailer";
import { formatDate } from "../../_lib/common/FormDate";
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
    const formattedDate = formatDate(NotifyData.date);
    const message = `
  <html>
  <head>
    <style>
      /* Add Tailwind's preflight base styles */
      body {
        @apply font-sans bg-gray-100;
      }
    </style>
  </head>
  <body class="bg-gray-100 m-0 p-0">
    <div class="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="bg-blue-600 text-white text-center p-4">
        <h1 class="text-2xl font-bold">Interview Scheduled</h1>
      </div>
      <div class="p-6">
        <p class="text-gray-800 mb-4">Dear ${participantEmail},</p>
        <p class="text-gray-800 mb-4">We are pleased to inform you that you have been scheduled for an interview with HireHub. Below are the details of your interview:</p>
        <p class="text-gray-800 mb-2"><strong>Title:</strong> ${NotifyData.title}</p>
        <p class="text-gray-800 mb-2"><strong>Description:</strong> ${NotifyData.description}</p>
        <p class="text-gray-800 mb-2"><strong>Interview Type:</strong> ${NotifyData.interviewType}</p>
        <p class="text-gray-800 mb-2"><strong>Job Position:</strong> ${NotifyData.jobPosition}</p>
        <p class="text-gray-800 mb-2"><strong>Date:</strong> ${formattedDate}</p>
        <p class="text-gray-800 mb-2"><strong>Start Time:</strong> ${NotifyData.startTime}</p>
        <p class="text-gray-800 mb-2"><strong>Host:</strong> ${NotifyData.interviewerEmail}</p>
        <p class="text-gray-800 mb-4"><strong>Meeting Link:</strong> <a href="${NotifyData.meetingLink}" class="inline-block bg-blue-600 text-white py-2 px-4 rounded-md font-bold no-underline">Join Meeting</a></p>
        <p class="text-gray-800 mb-4">Please be prepared for the interview and ensure that you are available at the specified time.</p>
        <p class="text-gray-800">We look forward to your participation.</p>
      </div>
      <div class="text-center p-4 text-sm text-gray-600">
        <p>Best regards,<br/>HireHub Team</p>
      </div>
    </div>
  </body>
  </html>
`;
    const mailOptions = {
      from: process.env.COMPANY_EMAIL,
      to: participantEmail,
      subject: `Interview Scheduled for ${NotifyData.jobPosition}`,
      html: message,
    };
     const info = await transporter.sendMail(mailOptions);
    //  console.log(`Email sent to ${participantEmail}: ${info.messageId}`);

     return `InterviewNotification email sent to ${participantEmail}`;
  } catch (error: any) {
    console.error("Something wrong in interview Notification");

    throw new Error(error?.message);
  }
};
