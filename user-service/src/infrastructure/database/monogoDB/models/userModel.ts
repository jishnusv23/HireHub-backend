import { UserEntities } from "../../../../domain/entities";
import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["interviewee", "interviewer", "admin", "pending"],
      default: "pending",
    },
    profile: {
      avatar: {
        type: String,
        default:
          "https://i.pinimg.com/originals/61/f7/5e/61f75ea9a680def2ed1c6929fe75aeee.jpg ",
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isGAuth: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<UserEntities>("users", userSchema);
