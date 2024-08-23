import { Router } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { controller } from "../../presentation/controller";

export const routes = (dependancies: IDependancies) => {
  const { createInterview } = controller(dependancies);
  const router = Router();

  router.route("/scheduleInterview").post(createInterview);

  return router;
};
