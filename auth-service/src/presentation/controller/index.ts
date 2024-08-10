import { IDependancies } from "@/application/interface/IDependancies";
import { sigupController } from "./signup";

export const controllers = (dependancies: IDependancies) => {
    return {
        signup:sigupController(dependancies)
    }
};
