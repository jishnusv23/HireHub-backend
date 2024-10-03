import { Application } from "express";
import proxy from "express-http-proxy";
import { routes } from "../_boot/routes.config";

export const setupRoutes = (app: Application) => {
  app.get("/test", (req, res) => {
    res.status(200).json({ success: true, message: "api is working" });
    console.log("api is working ");
  });

  routes.forEach((route) => {
    app.use(route.context, proxy(route.target));
  });
};
