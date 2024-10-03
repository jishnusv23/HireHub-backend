import { IDependancies } from "../../application/interface/IDependancies"
import { getUserController } from "./getUser"
import { getAllInterviewee } from "./getAll.vieweeController"
import { updateProfileImgController } from "./updateProfileImgController"

import { statusUpdateContoller } from "./statusUpdateController"
import { getAllInterviewer } from "./getAllInterviewerController"
import { AddContentBlog } from "./addContentBlog"
import { fetchContentController } from "./fetchContentController"
import { updateHandClappController } from "./updateHandClapController"
import { getAllContentRequestController } from "./getAllContentRequestController"
import { contentAcceptanceController } from "./Acceptencecontent-acceptanceController"
import { usersFetchAdminController } from "./usersFetchAdminController"
export const controller=(dependancies:IDependancies)=>{
    return {
      getUser: getUserController(dependancies),
      getAllInterviewee: getAllInterviewee(dependancies),
      blockunblockUser: statusUpdateContoller(dependancies),
      updateImg:updateProfileImgController(dependancies),
      getAllInterivewer:getAllInterviewer(dependancies),
      addContentBlog:AddContentBlog(dependancies),
      fetchAllContent:fetchContentController(dependancies),
      updateHandClapp:updateHandClappController(dependancies),
      getAllContentRequest:getAllContentRequestController(dependancies),
      ContentAcceptance:contentAcceptanceController(dependancies),
      userFetchAdmin:usersFetchAdminController(dependancies)
    };
}