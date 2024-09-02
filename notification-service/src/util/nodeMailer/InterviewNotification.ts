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
  <div class="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-10">
    <div class="bg-blue-700 text-white text-center py-6">
      <h1 class="text-3xl font-extrabold">Interview Scheduled</h1>
    </div>
    <div class="p-8">
      <p class="text-gray-800 mb-6">Dear ${participantEmail},</p>
      <p class="text-gray-800 mb-6">We are excited to inform you that your interview with <strong>HireHub</strong> has been scheduled. Please find the details below:</p>
      
      <div class="border-t border-b border-gray-300 py-4">
        <p class="text-gray-700 mb-3"><strong>Title:</strong> ${NotifyData.title}</p>
        <p class="text-gray-700 mb-3"><strong>Description:</strong> ${NotifyData.description}</p>
        <p class="text-gray-700 mb-3"><strong>Interview Type:</strong> ${NotifyData.interviewType}</p>
        <p class="text-gray-700 mb-3"><strong>Job Position:</strong> ${NotifyData.jobPosition}</p>
        <p class="text-gray-700 mb-3"><strong>Date:</strong> ${formattedDate}</p>
        <p class="text-gray-700 mb-3"><strong>Start Time:</strong> ${NotifyData.startTime}</p>
        <p class="text-gray-700 mb-3"><strong>Host:</strong> ${NotifyData.interviewerEmail}</p>
        <p class="text-gray-700 mb-3"><strong>Meeting Link:</strong> 
          <a href="${NotifyData.meetingLink}" class="inline-block bg-blue-700 text-white py-2 px-6 rounded-md font-bold no-underline hover:bg-blue-800 transition">Join Meeting</a>
        </p>
      </div>

      <p class="text-gray-800 mt-6">Please be prepared for the interview and ensure that you are available at the specified time.</p>
      <p class="text-gray-800 mt-6">We look forward to your participation.</p>
    </div>
    <div class="bg-gray-100 text-center py-4 text-sm text-gray-600 border-t border-gray-200">
      <p>Best regards,<br/>The HireHub Team</p>
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
