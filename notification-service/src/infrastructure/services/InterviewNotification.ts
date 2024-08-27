import { notifyInterview } from "../../util/nodeMailer";

export const InterviewNotification = async (data: any) => {
  try {
    const participants = data.participants;
    //   const response=await notifyInterview(data,participantEmails)
    //   return response
   const response=  await Promise.all(
       participants.map(async (email:string) => {
        console.log(data,email)
        //  await notifyInterview(data, email);
       })
     );
     return response
  } catch (error: any) {
    console.error(
      "Something wrong in notification handle service folder",
      error
    );
    throw new Error(error?.message);
  }
};
