import { IDependancies } from "@/application/interface/IDependancies";
import { NextFunction, Request, Response } from "express";

export const OtpVerificationController = (dependancies: IDependancies) => {
  const {
    useCases: { verifyOtpUseCases },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const { email, otp } = req.body;
      console.log("🚀 ~ file: otp-verificatio.ts:13 ~ return ~ email:", email)

      const result = await verifyOtpUseCases(dependancies).execute(email, otp);
      console.log(
        "🚀 ~ file: otp-verificatio.ts:15 ~ return ~ result:",
        result
      );

      if (!result) {
     return    res
          .status(200)
          .json({ success: false, data: {}, message: "OTP doesnt match" });
      } else {
        return res
          .status(202)
          .json({
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
