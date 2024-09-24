import express, { Request, Response, Application, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
import proxy from "express-http-proxy";


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

app.get("/test", (req,res) => {
  res.status(200).json({success:true,message:'Get Ready Api'})
  console.log("api is working");
});
const routes = [
  {
    context: "/api/auth",
    target: String(process.env.AUTH_SERVICE),
    changeOrigin: true,
  },
  {
    context: "/api/user",
    target: String(process.env.USER_SERVICE),
    changeOrigin: true,
  },
  {
    context: "/api/notify",
    target: String(process.env.NOTIFY_SERVICE),
    changeOrigin: true,
  },
  {
    context: "/api/interview",
    target: String(process.env.INTERVIEW_SERVICE),
    changeOrigin: true,
  },
  {
    context: "/api/execution",
    target: String(process.env.EXECUTION_SERVICE),
    changeOrigin: true,
  },
];

routes.forEach((route) => {
  app.use(route.context, proxy(route.target));
});

const start = () => {
  app.listen(PORT, () => {
    console.log(`The ${process.env.SERVICE} is lisening on the ${PORT}`);
  });
};

export default { start };
