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
  description: string;
  jobPosition: string;
  interviewerId: Types.ObjectId | string;
  date: Date;
  participants: string[];
  interviewStatus: interviewStatus;
  meetingLink?: string;
  startTime?: string;
  uniqueId: string;
  interviewType: string;
  createdAt?: Date;
  updatedAt?: Date;
}
