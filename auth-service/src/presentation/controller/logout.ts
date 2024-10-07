import { IDependancies } from "@/application/interface/IDependancies";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode";
import { Request, Response, NextFunction } from "express";
export const logoutController = (dependancies: IDependancies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("user logout");

      res.cookie("access_token", "", { maxAge: 1 });

      res.cookie("refresh_token", "", { maxAge: 1 });

      console.log("logout successfully");

      return res.status(HttpStatusCode.NO_CONTENT).json({});
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  };
};
