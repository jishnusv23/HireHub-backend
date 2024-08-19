import { IDependancies } from "../../application/interface/IDependancies"
import { getUserController } from "./getUser"
import { getAllInterviewee } from "./getAll.vieweeController"
import { blockunblockController } from "./blockunblockContorller"
export const controller=(dependancies:IDependancies)=>{
    return {
        getUser:getUserController(dependancies),
        getAllInterviewee:getAllInterviewee(dependancies),
        blockunblockUser:blockunblockController(dependancies),
    }
}