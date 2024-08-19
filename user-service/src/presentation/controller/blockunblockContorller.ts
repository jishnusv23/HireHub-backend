import { dependancies } from "@/_boot/dependencies";
import { IDependancies } from "../../application/interface/IDependancies";
import { Request, Response, NextFunction } from "express";

export const blockunblockController = (dependancies: IDependancies) => {
  const {
    useCases: { blockunblockUseCases },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body, "this user id and status");
      const { id, isBlocked } = req.body;
      if (!id || typeof isBlocked !== "boolean") {
        return res
          .status(404)
          .json({ success: false, msessage: "Invalid data " });
      }

      const response = await blockunblockUseCases(dependancies).execute(
        id,
        isBlocked
      );
      console.log(
        "🚀 ~ file: blockunblockContorller.ts:19 ~ return ~ response:",
        response
      );
      if (response) {
        return res.status(201).json({ success: true ,data:response,msesage:'Update the status successfully'});
      }
    } catch (error: any) {
      next(error);
    }
  };
};
