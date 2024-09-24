import { Router } from "express";
import { Controller } from "../controller/ExecutionController";
const router = Router();


router.route("/code-excution").post(Controller.ExecutionController)


export default router
