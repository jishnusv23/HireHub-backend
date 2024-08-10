import { IDependancies } from "@/application/interface/IDependancies";
import { Request, Response, NextFunction } from "express";
export const sigupController = (dependancies: IDependancies) => {
  const {
    useCases: { createUserUseCases },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Singup controller working");
    } catch (error: any) {
      next(error);
    }
  };
};
// QkDXWGP7SdnCQnNC;
