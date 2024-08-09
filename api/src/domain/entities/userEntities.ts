import { Types } from "mongoose";

enum Role {
  interviwee = "interviwee",
  interviwer = "interviwer",
  admin = "admin",
}

interface Profile {
  avatar?: string;
}

export interface userEntities {
  _id?: Types.ObjectId;
  username?: string;
  email: string;
  password: string;
  role: Role;
  profile: Profile;
  isBlocked: boolean;
  isGAuth?: boolean;
  createdAt?: Date;
}
