// import mongoose from "mongoose";
// import { config } from "dotenv";
// import { envString, envNumber } from "./enviornment";

// config();
// export const Configs = {
//   http: {
//     host: envString("HOST", "localhost"),
//     port: envNumber("PORT", 4002),
//   },
// };
import { config } from "dotenv";
import { CorsOptions } from "cors";
config()

export const corsOptions: CorsOptions = {
  origin: String(process.env.FRONT_END_URL),
  methods: "GET,POST,PUT,DELET,HEAD",
  credentials:true
};
