import { TechQuestionEntities } from "../../../../domain/entities";
import mongoose, { Schema, Types, model } from "mongoose";

const TechSchema = new Schema<TechQuestionEntities>(
  {
    name: {
      type: String,
      required: true,
    },
    questions: {
      type: String,
      required: true,
    },
    questionType: {
     
      type: String,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: "interview",
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

export const TechQuestion = model<TechQuestionEntities>(
  "TechQuestion",
  TechSchema
);
