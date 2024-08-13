import { hashpassword } from "../../_lib/http/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../_lib/http/jwt";
import validateUser from "../../_lib/validation/signup.validation";
import { IDependancies } from "../../application/interface/IDependancies";
import { Request, Response, NextFunction } from "express";
export const sigupController = (dependancies: IDependancies) => {
  const {
    useCases: { createUserUseCases, findUserByEmailUseCases },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Singup controller working", req.body);

      let afterValidUser = await validateUser(req.body);

      afterValidUser.password = await hashpassword(afterValidUser.password);
      const existingUser = await findUserByEmailUseCases(dependancies).execute(
        afterValidUser.email
      );
     
      if (existingUser) {
        return res.status(200).json({
          success: false,
          message: "User already exists",
          data: null,
        });
      } else {
        const created = await createUserUseCases(dependancies).execute(
          afterValidUser
        );
        if (!created) {
          res
            .status(500)
            .json({ success: false, message: "User creation failed" });
        } else {
          //*integrate the kafka here
          const userId = created?._id?.toString() as string;

          const accesstoken = generateAccessToken({
            _id: String(created?._id),
            email: created.email,
            role: created.role,
          });
          const refreshtoken = generateRefreshToken({
            _id: String(created?._id),
            email: created.email,
            role: created.role,
          });

          res.cookie("accesstoken", accesstoken, { httpOnly: true });
          res.cookie("refreshtoken", refreshtoken, { httpOnly: true });

          res
            .status(200)

            .json({
              success: true,
              message: "User created successfully",
              data: created,
            });
        }
      }
    } catch (error: any) {
      next(error);
    }
  };
};
