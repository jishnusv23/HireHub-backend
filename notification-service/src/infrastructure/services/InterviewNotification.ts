import { notifyInterview } from "../../util/nodeMailer";

export const InterviewNotification = async (data: any) => {
  try {
    const participants = data.participants;
    console.log("🚀 ~ file: InterviewNotification.ts:6 ~ InterviewNotification ~ participants:", participants)
    //   const response=await notifyInterview(data,participantEmails)
    //   return response
    const response = await Promise.all(
      participants.map(async (email: string) => {
        console.log("Sending email to:", email);

        try {
          // Send notification email to each participant
          const result = await notifyInterview(data, email);
          console.log(`Email sent to ${email}: ${result}`);
          return { email, result };
        } catch (emailError) {
          console.error(`Error sending email to ${email}:`, emailError);
          
        }
      })
    );

    return response;
  } catch (error: any) {
    console.error(
      "Something wrong in notification handle service folder",
      error
    );
    throw new Error(error?.message);
  }
};
