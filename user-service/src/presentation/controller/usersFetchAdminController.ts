import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../../_lib/http/statusCode/HttpStatusCode ";
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
  
      if (response) {
        return res.status(HttpStatusCode.OK).json({ success: true ,data:response,message:"successfully fetched "});
      }else{
        return res.status(HttpStatusCode.NOT_FOUND).json({success:false,data:null,message:'not valid users something wrong '})
      }
    } catch (error: any) {
      next(error);
    }
  };
};
