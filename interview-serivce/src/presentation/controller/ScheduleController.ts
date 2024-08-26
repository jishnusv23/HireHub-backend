import RabbitMQClient from "../../infrastructure/MQ/client";
import { IDependancies } from "../../application/interface/IDependancies";
import { Request, Response, NextFunction } from "express";

export const SchedulInterviewController = (dependancies: IDependancies) => {
  const {
    useCases: { IScheduleUseCases },
  } = dependancies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const client = await RabbitMQClient.getInstance();
      const userId = await client.produce(req.body, "fetchUserId", "toUser");
      console.log("🚀 ~ file: ScheduleController.ts:15 ~ return ~ userId:", userId)

      // const response=await IScheduleUseCases(dependancies).execute(req.body)
      // console.log("🚀 ~ file: ScheduleController.ts:12 ~ returnasync ~ response:", response)
    } catch (error: any) {
      next(error);
    }
  };
};
