import { IDependancies } from "../../application/interface/IDependancies";
import { MeetVerifyAccessController } from "./MeetverifyAccessController";
import { SchedulInterviewController } from "./ScheduleController";
import { cancelInterveiwController } from "./cancelInterviewController";
import { getAllMeetDetailsController } from "./getAlllDetailsMeet";
import { updateInterveiweController } from "./updateInterviewController";
import { verifyInterviewController } from "./verifyInterviewController";

export const controller = (dependacies: IDependancies) => {
  return {
    createInterview:SchedulInterviewController(dependacies),
    getAllInterviewes:getAllMeetDetailsController(dependacies),
    updateInterveiwes:updateInterveiweController(dependacies),
    cancelInterview:cancelInterveiwController(dependacies),
    VerifyInterivew:verifyInterviewController(dependacies),
    MeetAccessInterviewee:MeetVerifyAccessController(dependacies)
  };
};
