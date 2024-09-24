import { NextFunction, Request, Response } from "express";

export const Controller = {
  ExecutionController: async (req: Request, res: Response,next:NextFunction) => {
    try {
        console.log(req.body,'execute code is here ')
    } catch (error: any) {
        next(error)
    }
  },
};
