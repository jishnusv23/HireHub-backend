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
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .container {
      width: 100%;
      max-width: 600px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #00308F;
      color: white;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      font-size: 28px;
      margin: 0;
    }
    .content {
      padding: 30px;
    }
    .content p {
      color: #333333;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .content strong {
      color: #333333;
    }
    .button {
      background-color: #007bff;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 5px;
      display: inline-block;
      margin-top: 20px;
      font-size: 16px;
    }
    .button:hover {
      background-color: #0056b3;
    }
    .footer {
      background-color: #f9f9f9;
      text-align: center;
      padding: 15px;
      color: #666666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>HireHub - Interview Scheduled</h1>
    </div>
    <div class="content">
      <p>Dear ${participantEmail},</p>
      <p>We are pleased to inform you that your interview with <strong>HireHub</strong> has been scheduled. Please find the details below:</p>
      <p><strong>Title:</strong> ${NotifyData.title}</p>
      <p><strong>Job Position:</strong> ${NotifyData.jobPosition}</p>
      <p><strong>Scheduled Date:</strong> ${formattedDate}</p>
      <p><strong>Host:</strong> ${NotifyData.interviewerEmail}</p>
      <p>We look forward to your participation. Please ensure you're available at the specified time.</p>
      <a href="${NotifyData.meetingLink}" class="button">Join the Meeting</a>
    </div>
    <div class="footer">
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
