import { Types } from "mongoose";

enum Role {
  interviewee = "interviewee",
  interviewer = "interviewer",
  admin = "admin",
}

interface Profile {
  avatar: string;
}

export  interface UserEntities {
  _id?: Types.ObjectId;
  username?: string;
  email: string;
  password: string;
  role: Role;
  profile?: Profile;
  isBlocked: boolean;
  isGAuth?:boolean,
  createdAt?:Date
}
