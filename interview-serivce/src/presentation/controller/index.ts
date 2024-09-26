import { IDependancies } from "../../application/interface/IDependancies";
import { AddQuestionController } from "./AddQuestionController";
import { InstantMeetController } from "./InstantMeetController";
import { MeetVerifyAccessController } from "./MeetverifyAccessController";
import { SchedulInterviewController } from "./ScheduleController";
import { cancelInterveiwController } from "./cancelInterviewController";
import { getAllMeetDetailsController } from "./getAlllDetailsMeet";
import { submissionController } from "./submissioController";
import { updateInterveiweController } from "./updateInterviewController";
import { verifyInterviewController } from "./verifyInterviewController";

export const controller = (dependacies: IDependancies) => {
  return {
    createInterview:SchedulInterviewController(dependacies),
    getAllInterviewes:getAllMeetDetailsController(dependacies),
    updateInterveiwes:updateInterveiweController(dependacies),
    cancelInterview:cancelInterveiwController(dependacies),
    VerifyInterivew:verifyInterviewController(dependacies),
    MeetAccessInterviewee:MeetVerifyAccessController(dependacies),
    InstantMeet:InstantMeetController(dependacies),
    submissionCode:submissionController(dependacies),
    AddQuestions:AddQuestionController(dependacies)
  };
};
