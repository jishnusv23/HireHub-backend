import { Router } from "express";
import { jwtMiddleware, roleMiddleware } from "hirehub-middleware-version";
import { roleMiddlewareEnum } from "../../_lib/common/middleware/roleMiddleWareEnum";
import { IDependancies } from "../../application/interface/IDependancies";
import { controller } from "../../presentation/controller";


export const routes = (dependancies: IDependancies) => {
  const { createInterview, getAllInterviewes,updateInterveiwes,cancelInterview,VerifyInterivew,MeetAccessInterviewee,InstantMeet ,submissionCode,AddQuestions,geAllQuestionForInterivewer,getAllInterivewesById,adminFetchInterivewes} = controller(dependancies);
  const router = Router();

  router.route("/scheduleInterview").post(createInterview);
  router
    .route("/scheduleDetails")
    .get(jwtMiddleware, roleMiddleware([roleMiddlewareEnum.interviewer]), getAllInterviewes);

    router
      .route("/updateInterview/:id")
      .put(jwtMiddleware, roleMiddleware([roleMiddlewareEnum.interviewer]),updateInterveiwes);

      router
        .route("/cancelInterview")
        .put(jwtMiddleware, roleMiddleware([roleMiddlewareEnum.interviewer]),cancelInterview);


        //*verifyInterviewer side 
        router.route("/verifyInterview").post(VerifyInterivew)

        router.route("/isStartingInterview").get(MeetAccessInterviewee)

        //*instant Meet 
        router.route("/InstantMeet").post(jwtMiddleware,InstantMeet)

        //*code submission
        router.route("/code-submission").post(submissionCode)

        //*addquestion for interviewer
        router.route("/addQuestion").post(AddQuestions);

        //*get all question for interivewer
        router
          .route("/getAllQuestions")
          .get(
            jwtMiddleware,
            roleMiddleware([roleMiddlewareEnum.interviewer]),
            geAllQuestionForInterivewer
          );

          router
            .route("/interviewsById/:id")
            .get(
          
              getAllInterivewesById
            );

            //adminfetchInterivewe

            router
              .route("/Admin-Fetch-interivewes")
              .get(
                jwtMiddleware,
                roleMiddleware([roleMiddlewareEnum.admin]),
                adminFetchInterivewes
              );




  return router;
};

//router file interivew service