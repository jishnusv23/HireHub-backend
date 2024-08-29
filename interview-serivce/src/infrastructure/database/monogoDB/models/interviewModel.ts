import { InterviewEntity } from "../../../../domain/entities";
import mongoose, { model, Schema } from "mongoose";

const interviewSchema = new Schema(
  {
    interviewerId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    jobPosition: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    interviewStatus: {
      type: String,
      enum: ["Scheduled", "Ongoing", "Completed", "Cancelled"],
      default: "Scheduled",
    },
    meetingLink: {
      type: String,
      required: true,
    },
    interviewerEmail:{
      type:String
    },
    startTime: {
      type: String,
      required: true,
    },
    uniqueId: {
      type: String,
      required: true,
      unique: true, 
    },
    interviewType: {
      type: String,
      required: true,
    },
    participants: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const interview=model<InterviewEntity>('interview',interviewSchema)