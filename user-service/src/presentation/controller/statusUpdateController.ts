import { IDependancies } from "../../application/interface/IDependancies";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode ";
import { Request, Response, NextFunction } from "express";

export const statusUpdateContoller = (dependancies: IDependancies) => {
  const {
    useCases: {statusUpdateUseCases  },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body, "this user id and status");
      const { id, isBlocked } = req.body;
      console.log(
        "🚀 ~ file: blockunblockContorller.ts:14 ~ return ~ _id:",
        id
      );

      if (!id || typeof isBlocked !== "boolean") {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ success: false, message: "Invalid data" });
      }

    const response=await statusUpdateUseCases(dependancies).execute(id,isBlocked)
      console.log(
        "🚀 ~ file: blockunblockContorller.ts:19 ~ return ~ response:",
        response
      );
      if (response) {
        return res.status(HttpStatusCode.OK).json({
          success: true,
          data: response,
          message: "Status updated successfully",
        });
      } else {
        return res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ success: false, message: "User not found" });
      }
    } catch (error: any) {
      next(error);
    }
  };
};
