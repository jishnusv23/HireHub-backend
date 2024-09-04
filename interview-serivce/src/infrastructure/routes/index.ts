import { Router } from "express";
import { jwtMiddleware, roleMiddleware } from "hirehub-middleware-version";
import { IDependancies } from "../../application/interface/IDependancies";
import { controller } from "../../presentation/controller";

export const routes = (dependancies: IDependancies) => {
  const { createInterview, getAllInterviewes,updateInterveiwes,cancelInterview,VerifyInterivew,MeetAccessInterviewee } = controller(dependancies);
  const router = Router();

  router.route("/scheduleInterview").post(createInterview);
  router
    .route("/scheduleDetails")
    .get(jwtMiddleware, roleMiddleware(["interviewer"]), getAllInterviewes);

    router
      .route("/updateInterview/:id")
      .put(jwtMiddleware, roleMiddleware(["interviewer"]),updateInterveiwes);

      router
        .route("/cancelInterview")
        .put(jwtMiddleware, roleMiddleware(["interviewer"]),cancelInterview);


        //*verifyInterviewer side 
        router.route("/verifyInterview").post(VerifyInterivew)

        router.route("/isStartingInterview").post(MeetAccessInterviewee)

  return router;
};
