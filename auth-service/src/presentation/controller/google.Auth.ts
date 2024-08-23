import { Request, Response, NextFunction } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { OAuth2Client } from "google-auth-library";
import { UserEntities, Role } from "../../domain/entities";
import { generateAccessToken, generateRefreshToken } from "../../_lib/http/jwt";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuthController = (dependancies: IDependancies) => {
  const {
    useCases: { createUserUseCases, findUserByEmailUseCases },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { credential } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        return res.status(404).json({
          success: false,
          message:
            "Google token is invalid or does not contain an email address.",
        });
      }
      const UserExists = await findUserByEmailUseCases(dependancies).execute(
        payload.email
      );
      if (UserExists && !UserExists.isBlocked) {
          const accesstoken = generateAccessToken({
            _id: String(UserExists?._id),
            email: String(UserExists?.email),
            role: UserExists?.role,
          });
          const refreshtoken = generateRefreshToken({
            _id: String(UserExists?._id),
            email: UserExists?.email,
            role: UserExists?.role,
          });
          res.cookie("access_token", accesstoken, { httpOnly: true });
          res.cookie("refresh_token", refreshtoken, { httpOnly: true });
        return res
          .status(201)
          .json({
            success: true,
            message: "Google Login !",
            data: UserExists,
          });
      } else if (UserExists&&UserExists.isBlocked) {
        return res.status(404).json({
          success: false,
          
          data: null,
          message: "User is been blocked my HireHub team..!",
        });
      }

      
      let userData: any = {
        email: payload.email,
        username: payload.given_name,
        password: "@ItsSecure@",
        isGAuth: true,
        isVerified: true,
        role: "pending",
      };

      const { email, name, given_name } = payload;

      const user = await createUserUseCases(dependancies).execute(userData);
      if (user) {
        const accesstoken = generateAccessToken({
          _id: String(user?._id),
          email: String(user?.email),
          role: user?.role,
        });
        const refreshtoken = generateRefreshToken({
          _id: String(user?._id),
          email: user?.email,
          role: user?.role,
        });
        res.cookie("access_token", accesstoken, { httpOnly: true });
        res.cookie("refresh_token", refreshtoken, { httpOnly: true });
        return res
          .status(201)
          .json({ success: true, data: user, message: "User Login Google" });
      }
    } catch (error: any) {
      console.error("google auth function", error);

      next(error);
    }
  };
};