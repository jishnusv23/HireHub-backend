import express, { Request, Response, NextFunction, Application } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { routes } from "../infrastructure/routes";
import { dependacies } from "../_boot/dependencies";
import RabbitMQClient from "../infrastructure/MQ/client";
import { setupCronJobs } from "../infrastructure/CronJob";

const PORT: number = Number(process.env.PORT) || 4002;
const app: Application = express();
const corsOptions = {
  origin: process.env.FRONT_END_URL,
  methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
  credentials: true,
};

setupCronJobs()
// console.log("CORS Origin:", corsOptions.origin);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors(corsOptions));

app.get("/api/interview/test", (req: Request, res: Response) => {
  res
    .status(201)
    .json({ success: true, message: "interview service working " });
});

app.use("/", routes(dependacies));

const start = () => {
  app.listen(PORT, async() => {
    console.log(`💡The Interview service running successfully ${PORT}`);
    await RabbitMQClient.getInstance();
    
  });
};
export default { start };
