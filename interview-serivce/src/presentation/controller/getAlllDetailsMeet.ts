import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";

export const getAllMeetDetailsController = (dependacies: IDependancies) => {
  const {
    useCases: { IGetAllMeetDetailsUseCases },
  } = dependacies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.user, "user token details"); 
      console.log(req.query, "its getting in backend perfectly");

      const interviewerId = req.user?._id as string; 
      const { page, limit, search } = req.query;

      const response = await IGetAllMeetDetailsUseCases(dependacies).execute(
        Number(page),
        Number(limit),
        interviewerId,
        search as string
      );

      console.log(
        "🚀 ~ file: getAllMeetDetailsController.ts:13 ~ return async ~ response:",
        response
      );

    
    } catch (error: any) {
      next(error);
    }
  };
};
