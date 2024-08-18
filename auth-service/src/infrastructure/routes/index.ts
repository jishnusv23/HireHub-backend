import { Router } from "express";
import { IDependancies } from "../../application/interface/IDependancies";
import { controllers } from "../../presentation/controller";
// import {jwtMiddleware} from 'jwt-middleware-learnup'
import {jwtMiddleware} from 'hirehub-middleware-version'
import { otpLimitter } from "../../_lib/rateLimitter/otpLimitter";


export const routes = (dependancies: IDependancies) => {
  const { signup, findByEmail,googleAuth,login,getUser,logout,otpVerify } = controllers(dependancies);
  const router = Router();

  router.route("/signup").post(signup);
  router.route("/findByEmail/:email").post(findByEmail);
  router.route("/googleAuth").post(googleAuth)
  router.route('/login').post(login)
  // router.route("/getUser").get(jwtMiddleware,getUser);
  router.route('/logout').delete(jwtMiddleware,logout)
  router.route("/optverification").post(otpLimitter, otpVerify);

  return router;
};
