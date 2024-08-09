import mongoose from "mongoose";
import { config } from "dotenv";
import { envString, envNumber } from "./enviornment";

config();
export const Configs = {
  http: {
    host: envString("HOST", "localhost"),
    port: envNumber("PORT", 4002),
  },
};
