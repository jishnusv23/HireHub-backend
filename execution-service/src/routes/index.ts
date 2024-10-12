import { Router } from "express";
import { ExecutionController } from "../controller/ExecutionController";
const router = Router();
const executionController = new ExecutionController();


router.route("/code-excution").post(executionController.executeCode.bind(executionController));

export default router;
