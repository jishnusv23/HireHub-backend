import { Router } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { controller } from "../../presentation/controller/";
import {jwtMiddleware,roleMiddleware} from 'hirehub-middleware-version'
import { requireAdmin } from "../../_lib/common/middleWare/requireAdmin";
// import { jwtMiddleware } from "jwt-middleware-learnup";

export const routes = (dependancies: IDependancies) => {
  const { getUser,getAllInterviewee,blockunblockUser,updateImg,getAllInterivewer,addContentBlog,fetchAllContent } = controller(dependancies);
  const router = Router();

  router.route("/getUser").get(jwtMiddleware, getUser);
  router
    .route("/get-all-interviewee")
    .get(jwtMiddleware, roleMiddleware(['admin']), getAllInterviewee);

  router.route("/profile-status-update").put(jwtMiddleware,roleMiddleware(['admin'])
    ,blockunblockUser)


    //*Interivewer
      router
        .route("/get-all-interviewer")
        .get(jwtMiddleware, roleMiddleware(["admin"]), getAllInterivewer);

  //*--------
  router.route("/updateImge").put(updateImg)

  //create content
  router.route("/content-create").post(jwtMiddleware,addContentBlog)
  router.route("/content-all").get(fetchAllContent);

  return router;
};
