import { InterviewEntity } from "@/domain/entities";
import { interview } from "../models";


export const getAllInterivewesById=async(id:string)=>{
 try{
    const allInterviews = await interview.find({ interviewerId: id });
  
    if (allInterviews) {
      const interviews = allInterviews.map(
        (interview: any) => interview.toObject() as InterviewEntity
      );

      const totalInterviews = interviews.length; // Total interviews
      const completedInterviews = interviews.filter(
        (interview) => interview.interviewStatus === "Completed"
      ).length; // Filter by completed status

      return {
        // data: allInterviews,
        totalInterviews,
        completedInterviews,
      };
    } else {
      return null;
    }
    
 }  catch(error:any){
    console.error('something wrong in getAllsInterviewerById',error);
    throw new Error(error?.message)
    
 } 
}