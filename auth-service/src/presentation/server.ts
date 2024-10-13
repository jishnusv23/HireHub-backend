import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { routes } from "../infrastructure/routes";
import helmet from "helmet";
import { dependancies } from "../_boot/dependancies";
import RabbitMQClient from "../infrastructure/rabbitmq/client";

import { HttpStatusCode } from "../_lib/http/statusCode/HttpStatusCode";
import errorHandler from "../_lib/common/errorhandler";
config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api/auth", routes(dependancies));
// app.use("/", routes(dependancies));

app.use("*", (req: Request, res: Response) => {
  res.status(HttpStatusCode.NOT_FOUND).json({
    success: false,
    status: 404,
    message: "Api Not found--->auth",
  });
});

app.use(errorHandler)

const start = () => {
  app.listen(PORT, async () => {
    console.log(`The auth-service is listening on port ${PORT}`);
    await RabbitMQClient.getInstance();
  });
};
export default { start };
