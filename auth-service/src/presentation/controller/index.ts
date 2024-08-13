import { IDependancies } from "@/application/interface/IDependancies";
import { sigupController } from "./signup";
import { findByEmailcontroller } from "./findByEmail";
import { googleAuthController } from "./google.Auth";
import { LoginController } from "./login";

export const controllers = (dependancies: IDependancies) => {
    return {
        signup:sigupController(dependancies),
        findByEmail:findByEmailcontroller(dependancies),
        googleAuth:googleAuthController(dependancies),
        login:LoginController(dependancies)
    }
};
