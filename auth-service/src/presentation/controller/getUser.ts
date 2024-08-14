import { VerifyJwtToken } from "../../_lib/http/jwt";
import { IDependancies } from "../../application/interface/IDependancies";
import { Request, Response, NextFunction } from "express";

export const getUserController = (dependancies: IDependancies) => {
  const {
    useCases: { findUserByIdUseCases },
  } = dependancies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //   console.log(req.user);
      if (!req.user) {
        return res.status(404).json({success:false,message:'Authentication required'})
        // throw new Error("Athentication required:now no user");
      
      }

      const id = req.user?._id;
      const response = await findUserByIdUseCases(dependancies).execute(id);
      console.log("🚀 ~ file: getUser.ts:18 ~ return ~ response:", response)

      if (!response) {
        // throw new Error("user not found");
         return res
           .status(404)
           .json({ success: false, message: "Authentication required" });
      }
      return res
        .status(201)
        .json({ success: true, data: response, message: "user Exists" });
    } catch (error: any) {
      next(error);
    }
  };
};
