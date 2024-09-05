import { formatDate } from '../../_lib/common/FormDate'
import nodemailer from 'nodemailer'

export const CancelInterviewNotify=async(NotificationData:any,participantEmail:string):Promise<string>=>{
    try{
        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user: process.env.COMPANY_EMAIL,
                pass: process.env.COMPANY_PASSWORD,
            }
        })
        const forMattedDate=formatDate(NotificationData.date)
       const message = `
<html>
<head>
  <style>
    /* Include Tailwind CSS preflight base styles */
    body {
      @apply font-sans bg-gray-100;
    }
  </style>
</head>
<body class="bg-gray-100 m-0 p-0">
  <div class="flex items-center justify-center min-h-screen">
    <div class="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      
      <!-- HireHub Header -->
      <div class="bg-gray-900 text-white text-center py-4">
        <h1 class="text-4xl font-bold">HireHub</h1>
      </div>
      
      <!-- Main Content Starts -->
      <div class="bg-red-700 text-white text-center py-6">
        <h2 class="text-2xl font-extrabold">Interview Cancelled</h2>
        <p class="mt-2">Reminder - Your meeting has been canceled.</p>
      </div>
      <div class="p-6">
        <p class="text-gray-800 mb-4">Dear ${participantEmail},</p>
        <p class="text-gray-800 mb-4">Your interview for <strong>HireHub</strong> has been canceled. Please see the details below:</p>
        
        <div class="border-t border-b border-gray-300 py-4">
          <p class="text-gray-700 mb-2"><strong>Title:</strong> ${NotificationData.title}</p>
          <p class="text-gray-700 mb-2"><strong>Description:</strong> ${NotificationData.description}</p>
          <p class="text-gray-700 mb-2"><strong>Interview Type:</strong> ${NotificationData.interviewType}</p>
          <p class="text-gray-700 mb-2"><strong>Job Position:</strong> ${NotificationData.jobPosition}</p>
          <p class="text-gray-700 mb-2"><strong>Date:</strong> ${forMattedDate}</p>
          <p class="text-gray-700 mb-2"><strong>Scheduled Time:</strong> ${NotificationData.startTime}</p>
          <p class="text-gray-700 mb-2"><strong>Host:</strong> ${NotificationData.interviewerEmail}</p>
          <p class="text-gray-700 mb-4"><strong>Meeting Link:</strong> 
            <a href="${NotificationData.meetingLink}" class="inline-block bg-blue-700 text-white py-2 px-6 rounded-md font-bold no-underline hover:bg-blue-800 transition">Join Meeting</a>
          </p>
          <p class="text-gray-700 mb-4"><strong>Meeting Key:</strong> 1362901020</p>
        </div>

        <p class="text-gray-800 mt-4">You can also join the meeting using our iOS or Android apps for mobile.</p>

        <div class="mt-6 text-center">
          <a href="${process.env.LOGIN_URL}" class="inline-block bg-red-600 text-white py-2 px-6 rounded-md font-bold no-underline hover:bg-red-700 transition">Cancel Meeting</a>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="bg-gray-100 text-center py-4 text-sm text-gray-600 border-t border-gray-200">
        <p>Best regards,<br/>The HireHub Team</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

const mailOptions = {
  from: process.env.COMPANY_EMAIL,
  to: participantEmail,
  subject: `Interview Cancel for ${NotificationData.jobPosition}`,
  html: message,
};
const info = await transporter.sendMail(mailOptions);
//  console.log(`Email sent to ${participantEmail}: ${info.messageId}`);

return `InterviewNotification email sent to ${participantEmail}`;
       
    }catch(error:any){
        console.error('Something wrong in cancelInterviewNotificationMailer',error);
        throw new Error(error?.message)
        
    }

}