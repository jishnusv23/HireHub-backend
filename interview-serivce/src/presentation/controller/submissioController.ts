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
        response.output
      );
    //   const data = {
    //     output: String(response.output),
    //   };
    //   console.log(
    //     "🚀 ~ file: submissioController.ts:21 ~ return ~ data:",
    //     data
    //   );
      if (response?.error) {
        return res.status(400).json({
          sucess: false,
          output: response.output,
          error: response.error,
        });
      }
      return res.status(200).json({ success: true });
    } catch (error: any) {
      console.error(`Something wrong in execution-submisioncontroller`, error);
      return res.status(500).json({
        sucess: false,
        error: error?.message || "An Inernal server error occured",
      });
    }
  };
};
