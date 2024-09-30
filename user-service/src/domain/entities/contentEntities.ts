import { Types } from "mongoose";
export interface contentEntities {
  userId: Types.ObjectId;
  title: string;
  author: string;
  date: Date;
  content: string;
  tag: string;
  AdminAccept:boolean,
  response:number
  Imgurl: string;
}