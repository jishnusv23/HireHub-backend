import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode ";

export const InterivewesByIdController = (dependancies: IDependancies) => {
  const {
    useCases: { IGeetAllInterivewesByIdUseCases },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("req.query", req.params);
      const { id } = req.params;
      const response = await IGeetAllInterivewesByIdUseCases(
        dependancies
      ).execute(id);
      console.log(
        "🚀 ~ file: getAllInterviewesByIdController.ts:12 ~ return ~ response:",
        response
      );
      if (!response) {
        return res
          .status(HttpStatusCode.NOT_FOUND)
          .json({
            success: false,
            data: {},
            message: "id is wrong or interivewes does not get",
          });
      } else {
        return res
          .status(HttpStatusCode.OK)
          .json({
            success: true,
            data: response,
            message: "successfully fetched",
          });
      }
    } catch (error: any) {
      next(error);
    }
  };
};
