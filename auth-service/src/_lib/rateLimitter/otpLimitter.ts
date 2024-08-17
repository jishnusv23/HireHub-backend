import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const otpLimitter = rateLimit({
  windowMs: 5 * 60 * 100,
  max: 5,
  handler: (req: Request, res: Response) => {
    res
      .status(429)
      .json({
        error: "Too many OTP verification attempts. Please try again later",
      });
  },
});
