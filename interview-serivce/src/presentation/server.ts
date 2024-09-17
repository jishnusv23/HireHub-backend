import express, { Request, Response, NextFunction, Application } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { routes } from "../infrastructure/routes";
import { dependacies } from "../_boot/dependencies";
import RabbitMQClient from "../infrastructure/MQ/client";
import { setupCronJobs } from "../infrastructure/CronJob";
import { createServer, Server } from "http";

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

const start = (): Promise<Server> => {
  const httpServer = createServer(app); // Create HTTP server using Express app
  return new Promise((resolve, reject) => {
    httpServer.listen(PORT, async () => {
      try {
        console.log(
          `💡 The Interview service running successfully on port ${PORT}`
        );
        await RabbitMQClient.getInstance(); // Initialize RabbitMQ client
        resolve(httpServer); // Resolve the promise with the HTTP server instance
      } catch (error) {
        console.error("Error starting the server:", error);
        reject(error); // Reject the promise if there is an error
      }
    });
  });
};
export default { start };
