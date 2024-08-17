import { IDependancies } from "../../application/interface/IDependancies"
import { getUserController } from "./getUser"

export const controller=(dependancies:IDependancies)=>{
    return {
        getUser:getUserController(dependancies)
    }
}