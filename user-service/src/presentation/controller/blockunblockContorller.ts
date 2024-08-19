import { IDependancies } from "../../application/interface/IDependancies";
import { Request, Response, NextFunction } from "express";

export const blockunblockController = (dependancies: IDependancies) => {
  const {
    useCases: { blockUnblockUserUseCase },
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
          .status(400)
          .json({ success: false, message: "Invalid data" });
      }

      const response = await blockUnblockUserUseCase(dependancies).execute(
        id,
        isBlocked
      );
      console.log(
        "🚀 ~ file: blockunblockContorller.ts:19 ~ return ~ response:",
        response
      );
      if (response) {
        return res.status(200).json({
          success: true,
          data: response,
          message: "Status updated successfully",
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
    } catch (error: any) {
      next(error);
    }
  };
};
