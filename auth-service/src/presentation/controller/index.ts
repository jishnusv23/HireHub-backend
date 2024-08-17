import { IDependancies } from "@/application/interface/IDependancies";
import { sigupController } from "./signup";
import { findByEmailcontroller } from "./findByEmail";
import { googleAuthController } from "./google.Auth";
import { LoginController } from "./login";
import { getUserController } from "./getUser";
import { logoutController } from "./logout";
import { OtpVerificationController } from "./otp-verificatio";

export const controllers = (dependancies: IDependancies) => {
    return {
        signup:sigupController(dependancies),
        findByEmail:findByEmailcontroller(dependancies),
        googleAuth:googleAuthController(dependancies),
        login:LoginController(dependancies),
        getUser:getUserController(dependancies),
        logout:logoutController(dependancies),
        otpVerify:OtpVerificationController(dependancies)
    }
};
