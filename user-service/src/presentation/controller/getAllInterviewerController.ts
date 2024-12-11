import { IDependancies } from "../../application/interface/IDependancies";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode ";
import { Request, Response, NextFunction } from "express";

export const getAllInterviewer = (dependancies: IDependancies) => {
  const {
    useCases: { getAllInterviewerUseCases },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.query, "its getting in backend perfectly");
      const page = req.query.page
        ? parseInt(req.query.page as string, 10)
        : undefined;

      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : undefined;

      //*page!!
      if (page !== undefined && isNaN(page)) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ success: false, message: "Invalid Page Number" });
      }

      //* limiit!!
      if (limit !== undefined && isNaN(limit)) {
        return res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ success: false, message: "Invalid limit Number" });
      }
      const response = await getAllInterviewerUseCases(dependancies).execute(
        page,
        limit
      );
      // console.log(
      //   "🚀 ~ file: getAll.vieweeController.ts:34 ~ return ~ response:",
      //   response
      // );
      res.status(HttpStatusCode.CREATED).json({
        success: true,
        message: "Getting All Interviewee",
        data: response,
      });
    } catch (error: any) {
      next(error);
    }
  };
};
