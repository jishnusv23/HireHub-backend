import { CancelInterviewNotify } from "../../util/nodeMailer";

 export const CancelInterviewNotificationHandler=async(data:any)=>{
 try {
   const participants = data.participants;
   console.log("🚀 ~ file: CancelInterviewNotificationHandler.ts:6 ~ CancelInterviewNotificationHandler ~ participants:", participants)

   //   const response=await notifyInterview(data,participantEmails)
   //   return response
   // console.log(data.meetingLink,'link')
   const response = await Promise.all(
     participants.map(async (email: string) => {
       // console.log("Sending email to:", email);

       try {
         const result = await CancelInterviewNotify(data, email);
         //   console.log(`Email sent to ${email}: ${result}`);
         return result;
       } catch (emailError) {
         console.error(`Error sending email to ${email}:`, emailError);
       }
     })
   );

   return response;
 } catch (error: any) {
   console.error(
     "Something wrong in Cancelnotification handle service folder",
     error
   );
   throw new Error(error?.message);
 }
 }