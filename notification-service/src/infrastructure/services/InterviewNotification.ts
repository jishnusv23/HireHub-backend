import { notifyInterview } from "../../util/nodeMailer";

export const InterviewNotification = async (data: any) => {
  try{
    const participantEmail = data.participantEmail;
  const response=await notifyInterview(data,participantEmail)
  return response
  }catch(error:any){
    console.error('Something wrong in notification handle service folder',error);
    throw new Error(error?.message)
    
  }
};
