import { Router } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { controller } from "../../presentation/controller/";
import {jwtMiddleware,roleMiddleware} from 'hirehub-middleware-version'


export const routes = (dependancies: IDependancies) => {
  const { getUser,getAllInterviewee,blockunblockUser,updateImg,getAllInterivewer,addContentBlog,fetchAllContent,updateHandClapp,getAllContentRequest,ContentAcceptance,userFetchAdmin } = controller(dependancies);
  const router = Router();

  router.route("/getUser").get(jwtMiddleware, getUser);
  router
    .route("/get-all-interviewee")
    .get(jwtMiddleware, roleMiddleware(['admin']), getAllInterviewee);

  router.route("/profile-status-update").put(jwtMiddleware,roleMiddleware(['admin'])
    ,blockunblockUser)


    //*Interivewer
   router .route("/get-all-interviewer") .get(jwtMiddleware, roleMiddleware(["admin"]), getAllInterivewer);

  //*--------
  router.route("/updateImge").put(updateImg)

  //create content
  router.route("/content-create").post(jwtMiddleware,addContentBlog)
  router.route("/content-all").get(fetchAllContent);

  //*handclappupdate
  router.route("/handsClapp").put(updateHandClapp)

  router.route("/content-request").get(getAllContentRequest)
  router.route("/content-acceptance").put(jwtMiddleware,roleMiddleware(['admin']),ContentAcceptance)

  //for fetchallusers-in-interivewer
  router
    .route("/fetch-users-admin/:id")
    .get(jwtMiddleware, roleMiddleware(["admin"]), userFetchAdmin);

  return router;
};
