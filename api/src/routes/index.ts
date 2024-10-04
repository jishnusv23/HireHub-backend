import { Application } from "express";
import proxy from "express-http-proxy";
import { config } from "dotenv";
config()
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
    context: "/api/execution",
    target: String(process.env.EXECUTION_SERVICE),
    changeOrigin: true,
  },
  {
    context: "/api/interview",
    target: String(process.env.INTERVIEW_SERVICE),
    changeOrigin: true,
  },
];

export const setupRoutes = (app: Application) => {
  routes.forEach((route) => {
    app.use(route.context, proxy(route.target));
  });
};
