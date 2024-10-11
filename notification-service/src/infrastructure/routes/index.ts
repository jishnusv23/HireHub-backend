import { Router } from "express";

const router = Router();


router
  .route("/test")
  .get(()=>{
    console.log('notification-service')
  });

export default router;
