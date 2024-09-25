import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { executionServiceProvider } from "../../infrastructure/services/executionService";

export const submissionController = (dependancies: IDependancies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(
        req.body,
        "request body here __________________________",
        req.body?.data
      );
      const response = await executionServiceProvider(req.body);
      console.log(
        "🚀 ~ file: submissioController.ts:12 ~ returnasync ~ response:",
        response
      );
      if (response.data.error) {
        return res.status(400).json({
          sucess: false,
          output: response.data.output,
          error: response.data.error,
        });
      }
      return res
        .status(200)
        .json({ success: true, output: response.data.output });
    } catch (error: any) {
      console.error(`Something wrong in execution-submisioncontroller`, error);
      return res
        .status(500)
        .json({
          sucess: false,
          error: error?.message || "An Inernal server error occured",
        });
    }
  };
};
