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
  instantMeet:boolean
  description: string;
  jobPosition: string;
  interviewerId: Types.ObjectId | string;
  date: Date;
  reminded: boolean;
  participants: string[];
  interviewStatus: interviewStatus;
  meetingLink?: string;
  interviewerEmail: string;
  Ongoing: boolean;
  startTime?: string;
  uniqueId: string;
  interviewType: string;
  meetParticipants:number
  createdAt?: Date;
  updatedAt?: Date;
}
