import { Request, Response, NextFunction } from "express";
import ErrorResponse from "./errorResponse";
import { HttpStatusCode } from "../../http/statusCode/HttpStatusCode ";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorResponse) {
    return res.status(err.status).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }

  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    status: 500,
    message: "Internal Server Error",
  });
};

export default errorHandler;
