import { IDependancies } from "../../application/interface/IDependancies"
import { getUserController } from "./getUser"
import { getAllInterviewee } from "./getAll.vieweeController"
import { updateProfileImgController } from "./updateProfileImgController"

import { statusUpdateContoller } from "./statusUpdateController"
export const controller=(dependancies:IDependancies)=>{
    return {
      getUser: getUserController(dependancies),
      getAllInterviewee: getAllInterviewee(dependancies),
      blockunblockUser: statusUpdateContoller(dependancies),
      updateImg:updateProfileImgController(dependancies)
    };
}