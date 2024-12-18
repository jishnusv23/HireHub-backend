import { Router } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { controller } from "../../presentation/controller/";
import { roleMiddlewareEnum } from "../../_lib/common/middleWare/roleMiddlWareEnum";
import {jwtMiddleware,roleMiddleware} from 'hirehub-middleware-version'


export const routes = (dependancies: IDependancies) => {
  const { getUser,getAllInterviewee,blockunblockUser,updateImg,getAllInterivewer,addContentBlog,fetchAllContent,updateHandClapp,getAllContentRequest,ContentAcceptance,userFetchAdmin,changeUserName } = controller(dependancies);
  const router = Router();

  router.route("/getUser").get(jwtMiddleware, getUser);
  router
    .route("/get-all-interviewee")
    .get(jwtMiddleware, roleMiddleware([roleMiddlewareEnum.admin]), getAllInterviewee);

  router.route("/profile-status-update").put(jwtMiddleware,roleMiddleware([roleMiddlewareEnum.admin])
    ,blockunblockUser)


    //*Interivewer
   router .route("/get-all-interviewer") .get(jwtMiddleware, roleMiddleware([roleMiddlewareEnum.admin]), getAllInterivewer);

  //*--------
  router.route("/updateImge").put(updateImg)
  router.route("/user-name-change").put(jwtMiddleware,changeUserName)

  //create content
  router.route("/content-create").post(jwtMiddleware,addContentBlog)
  router.route("/content-all").get(fetchAllContent);

  //*handclappupdate
  router.route("/handsClapp").put(updateHandClapp)

  router.route("/content-request").get(getAllContentRequest)
  router.route("/content-acceptance").put(jwtMiddleware,roleMiddleware([roleMiddlewareEnum.admin]),ContentAcceptance)

  //for fetchallusers-in-interivewer
 router
   .route("/fetch-users-admin/:id")
   .get( userFetchAdmin);

  return router;
};
