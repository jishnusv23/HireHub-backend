import express, { Request, Response, NextFunction, Application } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

const PORT: number = Number(process.env.PORT) || 4002;
const app: Application = express();
const corsOption = {
  origin: String(process.env.FRONT_END_URL),
  methods: "GET,POST,PUT,DELETE,HEAD",
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors(corsOption));

app.use("/api/interview/test", (req: Request, res: Response) => {
  res
    .status(201)
    .json({ success: true, message: "interview service working " });
})

const start = () => {
  app.listen(PORT, () => {
    console.log(`💡The Interview service running successfully ${PORT}`);
  });
};
export default {start}
