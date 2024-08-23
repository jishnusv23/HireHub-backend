import express, { Application } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { routes } from "../infrastructure/routes";
import { dependancies } from "../_boot/dependancies";
import RabbitMQClient from "../infrastructure/rabbitmq/client";
config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/", routes(dependancies));

const start = () => {
  app.listen(PORT,async () => {
    console.log(`The auth-service is listening on port ${PORT}`);
    await RabbitMQClient.getInstance()
  });
};
export default { start };