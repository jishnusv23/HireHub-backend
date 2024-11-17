import { generateAccessToken, generateRefreshToken } from "../../_lib/http/jwt";
import loginValidation from "../../_lib/validation/login.validation";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode";
import { IDependancies } from "../../application/interface/IDependancies";
import { Request, Response, NextFunction } from "express";

export const LoginController = (dependancies: IDependancies) => {
  const {
    useCases: { loginUserUseCases },
  } = dependancies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("🚀 ~ file: login.ts:14 ~ return ~ req.body:", req.body);
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(200)
          .json({ success: true, message: "Email and password is required" });
      }
      const validUser = await loginValidation(req.body);
      console.log("🚀 ~ file: login.ts:16 ~ return ~ validUser:", validUser);

      //pass the data
      const result = await loginUserUseCases(dependancies).execute(
        validUser.username,
        validUser.password
      );

      console.log("🚀 ~ file: login.ts:32 ~ return ~ result:", result);
      const userId = result?._id?.toString() as string;
      if (!result) {
        return res.status(400).json({
          success: false,
          exsistingUser: false,
          message: "User doesn't exist or incorrect password",
        });
      }
      if (result.isBlocked) {
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json({
            success: false,
            message: "User is been blocked my HireHub team..!",
            data:null
          });
      }
      const accesstoken = generateAccessToken({
        _id: String(result?._id),
        email: String(result?.email),
        role: result?.role,
      });
      const refreshtoken = generateRefreshToken({
        _id: String(result?._id),
        email: result?.email,
        role: result?.role,
      });

      // access_token, refresh_token;
      res.cookie("access_token", accesstoken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 60 * 60 * 1000,
      });

      res.cookie("refresh_token", refreshtoken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 60 * 60 * 24 * 1000 * 12,
      });

      //   //successfully
      return res.status(HttpStatusCode.CREATED).json({
        success: true,
        data: result,
        message: "User Created successfully",
      });
    } catch (error: any) {
      next(error);
    }
  };
};
