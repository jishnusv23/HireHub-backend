import { IDependancies } from "@/application/interface/IDependancies";
import { sigupController } from "./signup";
import { findByEmailcontroller } from "./findByEmail";
import { googleAuthController } from "./google.Auth";
import { LoginController } from "./login";
import { getUserController } from "./getUser";
import { logoutController } from "./logout";
import { OtpVerificationController } from "./otp-verificatio";
import { GenerateOneTimePasss } from "./oneTime-pass";
import { forgotPasswordMailsend } from "./forgotPassMail";

export const controllers = (dependancies: IDependancies) => {
    return {
        signup:sigupController(dependancies),
        findByEmail:findByEmailcontroller(dependancies),
        googleAuth:googleAuthController(dependancies),
        login:LoginController(dependancies),
        getUser:getUserController(dependancies),
        logout:logoutController(dependancies),
        otpVerify:OtpVerificationController(dependancies),
        OtpOneTimepass:GenerateOneTimePasss(dependancies),
        forgotPasswordMail:forgotPasswordMailsend(dependancies)

    }
};
