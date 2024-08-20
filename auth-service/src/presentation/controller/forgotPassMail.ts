
import { SendForgotPassMail } from "../../infrastructure/services/sendForgotMaile";
import { generateForgotPasswords } from "../../_lib/http/jwt";
import { IDependancies } from "../../application/interface/IDependancies";
import { Request, Response, NextFunction } from "express";

export const forgotPasswordMailsend = (dependancies: IDependancies) => {
  const {
    useCases: { findUserByEmailUseCases },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body,'forgot email');
      const { email } = req.body;
      const response = await findUserByEmailUseCases(dependancies).execute(
        email
      );

      if (response?.isBlocked) {
        return res.status(200).json({
          success: true,
          data: response,
          message: "User is blocked",
          isBlocked: true,
        });
      }

      if (response?.isGAuth) {
        return res.status(200).json({
          success: true,
          data: response,
          isGAuth: true,
          message: "Please use Google authentication",
        });
      }

      // Generate the token
      const token =await SendForgotPassMail(email)
      console.log("🚀 ~ file: forgotPassMail.ts:40 ~ return ~ token:", token)
    //   const client=await RabbitMQClient.getInstance()
    //   const responseNotify=await client.produce(data{email:email,token:token},'forgotPassNotify',' ')
    if(token){
        return res.status(201).json({success:true,data:{},message:"check your email"})

    }

      
    } catch (error: any) {
      next(error);
    }
  };
};
