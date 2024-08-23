import { IDependancies } from "../../application/interface/IDependancies";
import { SchedulInterviewController } from "./ScheduleController";

export const controller = (dependacies: IDependancies) => {
  return {
    createInterview:SchedulInterviewController(dependacies)
  };
};
