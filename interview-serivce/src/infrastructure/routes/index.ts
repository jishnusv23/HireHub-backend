import { Router } from "express";
import { jwtMiddleware, roleMiddleware } from "hirehub-middleware-version";
import { IDependancies } from "../../application/interface/IDependancies";
import { controller } from "../../presentation/controller";

export const routes = (dependancies: IDependancies) => {
  const { createInterview, getAllInterviewes } = controller(dependancies);
  const router = Router();

  router.route("/scheduleInterview").post(createInterview);
  router
    .route("/scheduleDetails")
    .get(jwtMiddleware, roleMiddleware(["interviewer"]), getAllInterviewes);

  return router;
};
