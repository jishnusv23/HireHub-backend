import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode ";
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
      if (response?.error) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          sucess: false,
          output: response.output,
          error: response.error,
        });
      }
      return res
        .status(HttpStatusCode.OK)
        .json({ success: true, output: response.output });
    } catch (error: any) {
      console.error(`Something wrong in execution-submisioncontroller`, error);
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({
          sucess: false,
          error: error?.message || "An Inernal server error occured",
        });
    }
  };
};
