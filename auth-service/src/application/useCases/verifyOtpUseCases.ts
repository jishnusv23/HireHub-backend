import { IDependancies } from "../interface/IDependancies";

export const verifyOtpUseCases = (dependancies: IDependancies) => {
  const {
    repositories: { verifyOtp },
  } = dependancies;
  return {
    execute: async (email: string, otp: string) => {
      try {
        const result = await verifyOtp(email, otp);
        return result
      } catch (error: any) {
        console.error("something wrong in otpuseCase", error);
      }
    },
  };
};
