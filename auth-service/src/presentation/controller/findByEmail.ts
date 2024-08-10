import { IDependancies } from "@/application/interface/IDependancies";
import { Request, Response, NextFunction } from "express";

export const findByEmailcontroller = (dependancies: IDependancies) => {
  const {
    useCases: { findUserByEmailUseCases },
  } = dependancies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.params, "email");
      const { email } = req.params;
      const response = await findUserByEmailUseCases(dependancies).execute(
        email
      );
      console.log(
        "🚀 ~ file: findByEmail.ts:13 ~ return ~ response:",
        response
      );
      if (response) {
        res
          .status(409)
          .json({ success: false, message: "Email already exists" });
      }else{
        res
            .status(202)
            .json({success:true,message:'Email is unique'})
      }
    } catch (error: any) {
      next(error);
    }
  };
};
