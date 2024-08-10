import { Router } from "express";
import { IDependancies } from "@/application/interface/IDependancies";
import { controllers } from "@/presentation/controller";

export const routes = (dependancies: IDependancies) => {
  const { signup } = controllers(dependancies);
  const router = Router();

  router.route("/signup").post(signup);

  return router;
};
