import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { verifyforgotPassword } from "../../_lib/http/jwt";
import { hashpassword } from "../../_lib/http/bcrypt/hashpassword";

export const updatePasswordController = (dependancies: IDependancies) => {
  const {
    useCases: { updatePasswordUseCases },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body, "------------------");
      const { password, token } = req.body;
      const verifyed = await verifyforgotPassword(token);

      if (!verifyed) {
        return res.status(404).json({
          success: false,
          data: {},
          message: "Token Is Expired or unavailable!..",
        });
      }
      const hashPasswrod = await hashpassword(password);

      const response = await updatePasswordUseCases(dependancies).execute(
        verifyed.email,
        hashPasswrod
      );
      console.log(
        "🚀 ~ file: updatePasswrodController.ts:24 ~ return ~ response:",
        response
      );
      if (!response) {
        throw new Error("Password updation failed");
      }
      return res
        .status(201)
        .json({ success: true, data: response, message: "Password Updated" });
    } catch (error: any) {
      next(error);
    }
  };
};
