import { Types } from "mongoose";

 export enum Role {
  pending='pending',
  interviewee = "interviewee",
  interviewer = "interviewer",
  admin = "admin",
}

interface Profile {
  avatar: string;
}

export  interface UserEntities {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: Role;
  profile?: Profile;
  isBlocked: boolean;
  isVefified?:boolean,
  isGAuth?:boolean,
  createdAt?:Date
}
