import { config } from "dotenv";
import mongoose from "mongoose";
config()

export default async()=>{
    try {
      const mongoURI = process.env.MONGODB_URI;
      if (!mongoURI) {
        throw new Error("Mongodb connection path is not geting in eviornment");
      }
      await mongoose.connect(mongoURI.trim());
      console.log("👽Mongodb connected successfully---->user-services");
    } catch (error: any) {
      console.error(`🥅Database Connection Failed 🥅 `);
      console.error("sfsf", error?.message);
      process.exit(1);
    }
}