import { NextFunction, Request, Response } from "express";
import { IDependancies } from "../../application/interface/IDependancies";

export const usersFetchAdminController = (dependancies: IDependancies) => {
  const {
    useCases: { usersFetchAdminUseCases },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(
        req.params,
        "geting params here ______________________________________"
      );
      const response = await usersFetchAdminUseCases(dependancies).execute(
        req.params.id
      );
      console.log("🚀 ~ file: usersFetchAdminController.ts:19 ~ return ~ response:", response)
      if (response) {
        return res.status(200).json({ success: true ,data:response,message:"successfully fetched "});
      }else{
        return res.status(400).json({success:false,data:null,message:'not valid users something wrong '})
      }
    } catch (error: any) {
      next(error);
    }
  };
};
