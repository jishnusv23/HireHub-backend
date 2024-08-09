import express, { Request, Response, Application, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
import proxy from "express-http-proxy";
import { METHODS } from "http";

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

const routes = [
  {
    context: "/api/auth",
    target: String(process.env.AUTH_SERVICE),
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
