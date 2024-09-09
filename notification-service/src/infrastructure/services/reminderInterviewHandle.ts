import { reminderInterviewNotification } from "../../util/nodeMailer";

export const reminderInterveiwHandler = async (data: any) => {
  try {
     const participants = data.participants;
     const interviewerEmail = data.interviewerEmail; 
     const interviewParticipants = [...participants, interviewerEmail];

     const response = await Promise.all(
       interviewParticipants.map(async (email: string) => {
         try {
           const result = await reminderInterviewNotification(data, email);
           return result;
         } catch (emailError) {
           console.error(`Error sending email to ${email}:`, emailError);
         }
       })
     );

     return response;
  } catch (error: any) {
    console.error("something wrong interivew");
  }
};
