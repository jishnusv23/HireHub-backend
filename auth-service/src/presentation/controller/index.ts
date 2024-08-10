import { IDependancies } from "@/application/interface/IDependancies";
import { sigupController } from "./signup";
import { findByEmailcontroller } from "./findByEmail";

export const controllers = (dependancies: IDependancies) => {
    return {
        signup:sigupController(dependancies),
        findByEmail:findByEmailcontroller(dependancies)
    }
};
