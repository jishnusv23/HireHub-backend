import mongoose from "mongoose";
import { config } from "dotenv";

config();

export default async () => {
  try {
    const mongoUrl = process.env.MONGODB_URI;
    if (!mongoUrl) {
      throw new Error("Mongodb connection path is not geting in eviornment");
    }
    await mongoose.connect(mongoUrl.trim());
    console.log("👽Mongodb connected successfully---->auth-services");
  } catch (error: any) {
    console.error(`🥅Database Connection Failed 🥅 `);
    console.error(error?.message);
    process.exit(1);
  }
};
