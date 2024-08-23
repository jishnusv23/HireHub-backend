import express, { Request, Response, NextFunction, Application } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan('dev'))
