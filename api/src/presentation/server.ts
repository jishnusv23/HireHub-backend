import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
import { setupRoutes } from "../routes";

config();

const app: Application = express();
const PORT = Number(process.env.PORT) || 2001;

const corsOption = {
  origin: String(process.env.FRONT_END_URL),
  methods: "GET,POST,PUT,DELETE,HEAD",
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOption));

setupRoutes(app);

const start = () => {
  app.listen(PORT, () => {
    console.log(`The ${process.env.SERVICE} is listening on port ${PORT}`);
  });
};

export default { start };
