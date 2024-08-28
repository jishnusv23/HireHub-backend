import { IDependancies } from "../../application/interface/IDependancies";
import { SchedulInterviewController } from "./ScheduleController";
import { getAllMeetDetailsController } from "./getAlllDetailsMeet";

export const controller = (dependacies: IDependancies) => {
  return {
    createInterview:SchedulInterviewController(dependacies),
    getAllInterviewes:getAllMeetDetailsController(dependacies)
  };
};
