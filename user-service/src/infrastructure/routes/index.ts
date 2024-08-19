import { Router } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { controller } from "../../presentation/controller/";
import {jwtMiddleware} from 'hirehub-middleware-version'
import { requireAdmin } from "../../_lib/common/middleWare/requireAdmin";
// import { jwtMiddleware } from "jwt-middleware-learnup";

export const routes = (dependancies: IDependancies) => {
  const { getUser,getAllInterviewee } = controller(dependancies);
  const router = Router();

  router.route("/getUser").get(jwtMiddleware, getUser);
  router.route("/get-all-interviewee").get(jwtMiddleware,requireAdmin,getAllInterviewee)

  return router;
};
