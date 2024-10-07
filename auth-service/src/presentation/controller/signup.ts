import RabbitMQClient from "../../infrastructure/rabbitmq/client";
import { hashpassword } from "../../_lib/http/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../_lib/http/jwt";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode";
import validateUser from "../../_lib/validation/signup.validation";
import { IDependancies } from "../../application/interface/IDependancies";
import { Request, Response, NextFunction } from "express";
import { generateOTP } from "../../_lib/utils/otp/genarateOtp";
import { confirmOtpNotification } from "../../infrastructure/services/sendMaile";
import { InterviewParticipants } from "../../infrastructure/services/InterviewParticipants";
export const sigupController = (dependancies: IDependancies) => {
  const {
    useCases: { createUserUseCases, findUserByEmailUseCases },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Singup controller working", req.body);

      let afterValidUser = await validateUser(req.body);
      let checkParticipants=await InterviewParticipants(afterValidUser.email)

      afterValidUser.password = await hashpassword(afterValidUser.password);
      const existingUser = await findUserByEmailUseCases(dependancies).execute(
        afterValidUser.email
      );

    
      if (existingUser) {
        return res.status(HttpStatusCode.OK).json({
          success: false,
          message: "User already exists",
          data: null,
        });
      } else {
      
         return  res .status(HttpStatusCode.OK).json({
            success: true,
            message: "User desn't exists",
            data:null ,
          });
        
      }

    } catch (error: any) {
      next(error);
    }
  };
};
