import mongoose, { Types } from "mongoose";

export interface TechQuestionEntities {
  userId?: Types.ObjectId | string;
  questions: string;
  questionType: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
