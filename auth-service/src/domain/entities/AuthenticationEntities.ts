import { Types } from "mongoose";
export interface AuthenticationEntities {
  _id?: Types.ObjectId;
  username?: string;
  email: string;
  password: string;
  confirmpassword?: string;
}
