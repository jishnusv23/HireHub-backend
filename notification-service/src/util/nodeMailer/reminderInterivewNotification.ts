import { formatDate } from '../../_lib/common/FormDate';
import nodemailer from 'nodemailer'


export const reminderInterviewNotification=async(NotifyData:any,participantEmail:string):Promise<string>=>{
    try{
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
      .container {
        width: 100%;
        max-width: 600px;
        margin: auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
      }
      .header {
        background-color: #ff4c4c;
        color: #ffffff;
        padding: 10px 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content p {
        margin: 0 0 15px;
        line-height: 1.6;
        color: #333333;
      }
      .content p strong {
        color: #333333;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin-top: 20px;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        font-size: 16px;
      }
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: #777777;
      }
    </style>
  </head>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
    <div class="container">
      <div class="header" style="background-color: #ff4c4c; color: #ffffff; padding: 10px 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Interview Reminder</h1>
      </div>
      <div class="content" style="padding: 20px;">
        <p style="margin: 0 0 15px; line-height: 1.6; color: #333333;">Dear ${participantEmail},</p>
        <p style="margin: 0 0 15px; line-height: 1.6; color: #333333;">This is a reminder for your upcoming interview:</p>
        <p style="margin: 0 0 15px; line-height: 1.6; color: #333333;"><strong>Title:</strong> ${NotifyData.title}</p>
        <p style="margin: 0 0 15px; line-height: 1.6; color: #333333;"><strong>Job Position:</strong> ${NotifyData.jobPosition}</p>
        <p style="margin: 0 0 15px; line-height: 1.6; color: #333333;"><strong>Scheduled Date:</strong> ${formattedDate}</p>
        <p style="margin: 0 0 15px; line-height: 1.6; color: #333333;"><strong>Host:</strong> ${NotifyData.interviewerEmail}</p>
        <p style="margin: 0 0 15px; line-height: 1.6; color: #333333;">This is a friendly reminder about your scheduled interview</p>
        <p style="margin: 0 0 15px; line-height: 1.6; color: #333333;">If you have any questions, feel free to contact us.</p>
        <a href="${NotifyData.meetingLink}" class="button">Join the Meeting</a>
      </div>
      <div class="footer" style="text-align: center; padding: 20px; font-size: 14px; color: #777777;">
        <p style="margin: 0;">Best regards,<br/>HireHub Team</p>
      </div>
    </div>
  </body>
  </html>
`;

         const mailOptions = {
           from: process.env.COMPANY_EMAIL,
           to: participantEmail,
           subject: `Interview Cancel for ${NotifyData.jobPosition}`,
           html: message,
         };
         const info = await transporter.sendMail(mailOptions);
         //  console.log(`Email sent to ${participantEmail}: ${info.messageId}`);

         return `InterviewNotification email sent to ${participantEmail}`;


    
    }catch(error:any){
        console.error('Something wrong in reminderNotification');
        throw new Error(error?.message)
        
    }
    
}