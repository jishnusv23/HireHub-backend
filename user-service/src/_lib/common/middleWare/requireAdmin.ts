import { Request, Response, NextFunction } from "express";
import { findUserById } from "../../../infrastructure/database/monogoDB/repositories";

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    console.log("unAuthorized user");
  }
  const user = await findUserById(req.user?._id as string);
  console.log("🚀 ~ file: requireAdmin.ts:13 ~ user:", user);
  if (!user) {
    console.log("UnAuthorized");
  }
  if(user?.role!=='admin'){
    console.log("only access in admin")
  }
  next()
};
