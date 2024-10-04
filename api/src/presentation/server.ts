import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
import { corsOptions } from "../_boot/config";
import { setupRoutes } from "../routes";

config();
const app: Application = express();

const PORT = Number(process.env.PORT) || 2001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));


const start = () => {
  setupRoutes(app);
  app.listen(PORT, () => {
    console.log(`The ${process.env.SERVICE} is listening on port ${PORT}`);
  });
};

export default { start };
