import { IDependancies } from "../../application/interface/IDependancies";
import { SchedulInterviewController } from "./ScheduleController";
import { getAllMeetDetailsController } from "./getAlllDetailsMeet";
import { updateInterveiweController } from "./updateInterviewController";

export const controller = (dependacies: IDependancies) => {
  return {
    createInterview:SchedulInterviewController(dependacies),
    getAllInterviewes:getAllMeetDetailsController(dependacies),
    updateInterveiwes:updateInterveiweController(dependacies)
  };
};
