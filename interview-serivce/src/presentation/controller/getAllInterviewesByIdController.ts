import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";

export const InterivewesByIdController = (dependancies: IDependancies) => {
  const {useCases:{IGeetAllInterivewesByIdUseCases}} = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("req.query", req.params);
    } catch (error: any) {
      next(error);
    }
  };
};
