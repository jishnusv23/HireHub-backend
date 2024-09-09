import { hashpassword } from "../../_lib/http/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../_lib/http/jwt";
import { IDependancies } from "../../application/interface/IDependancies";
import { NextFunction, Request, Response } from "express";

export const OtpVerificationController = (dependancies: IDependancies) => {
  const {
    useCases: { verifyOtpUseCases },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const { datas, otp } = req.body;
      datas.password = await hashpassword(datas.password);
      const result = await verifyOtpUseCases(dependancies).execute(datas, otp);
      console.log(
        "🚀 ~ file: otp-verificatio.ts:15 ~ return ~ result:",
        result
      );

      if (!result) {
        return res
          .status(200)
          .json({ success: false, data: {}, message: "OTP doesnt match" });
      } else {
        const userId = result?._id?.toString() as string;

        const accesstoken = generateAccessToken({
          _id: String(result?._id),
          email: result.email,
          role: result.role,
        });
        const refreshtoken = generateRefreshToken({
          _id: String(result?._id),
          email: result.email,
          role: result.role,
        });

        res.cookie("access_token", accesstoken, { httpOnly: true });
        res.cookie("refresh_token ", refreshtoken, { httpOnly: true });

        return res.status(202).json({
          success: true,
          data: result,
          message: "OTP verified successfully",
        });
      }
    } catch (error: any) {
      console.error("Something wrong in verifyotp", error);
      throw new Error(error?.message);
    }
  };
};
