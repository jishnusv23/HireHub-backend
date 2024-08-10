import { Router } from "express";
import { IDependancies } from "@/application/interface/IDependancies";
import { controllers } from "../../presentation/controller";

export const routes = (dependancies: IDependancies) => {
  const { signup,findByEmail } = controllers(dependancies);
  const router = Router();

  router.route("/signup").post(signup);
  router.route('/findByEmail/:email').post(findByEmail)

  return router;
};
