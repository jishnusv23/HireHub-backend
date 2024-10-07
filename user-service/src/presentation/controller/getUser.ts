import { IDependancies } from "../../application/interface/IDependancies";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode ";
import { Request, Response, NextFunction } from "express";

export const getUserController = (dependancies: IDependancies) => {
  const {
    useCases: { findUserByIdUseCases },
  } = dependancies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.user);
      if (!req.user) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Authentication requireeeeeeeeeed",
        });
        // throw new Error("Athentication required:now no user");
      }

      const id = req.user?._id;
      console.log("🚀 ~ file: getUser.ts:22 ~ return ~ id:", id);
      const response = await findUserByIdUseCases(dependancies).execute(id);
      console.log("🚀 ~ file: getUser.ts:18 ~ return ~ response:", response);

      if (!response) {
        // throw new Error("user not found");
        return res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ success: false, message: "User not found" });
      }
      return res
        .status(HttpStatusCode.CREATED)
        .json({ success: true, data: response, message: "user Exists" });
    } catch (error: any) {
      next(error);
    }
  };
};
