import { InterviewEntity } from "../../../../domain/entities";
import mongoose, { model, Schema } from "mongoose";

const interviewSchema = new Schema(
  {
    interviewerId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    jobPosition: {
      type: String,
      required: true,
    },
    scheduledDateTime: {
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
    interviewDuration: {
      type: Number,
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