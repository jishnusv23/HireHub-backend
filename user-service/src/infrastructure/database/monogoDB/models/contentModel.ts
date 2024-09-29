import mongoose, { Schema, Types, model } from "mongoose";
import { contentEntities } from "../../../../domain/entities";

const contentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: "users",
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  Imgurl:{
    type:String,
    required:true
  }
});


export const contentM = model<contentEntities>("content", contentSchema);
