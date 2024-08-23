import mongoose, { Types } from "mongoose";

enum interviewStatus {
  Scheduled = "Scheduled",
  Ongoing = "Ongoing",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export interface InterviewEntity {
  _id?: string;
  title: string;
  jobPosition: string;
  interviewerId: Types.ObjectId | string;
  scheduledDateTime: Date;
  intervieweeEmail: string;
  interviewStatus: interviewStatus;
  meetingLink?: string;
  interviewDuration?: number;
  interviewType: string; 
  createdAt?: Date;
  updatedAt?: Date;
}
