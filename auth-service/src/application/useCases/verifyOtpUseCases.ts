import { IOtp, UserEntities } from "../.../../../domain/entities";
import { IDependancies } from "../interface/IDependancies";

export const verifyOtpUseCases = (dependancies: IDependancies) => {
  const {
    repositories: { verifyOtp },
  } = dependancies;
  return {
    execute: async (email: string, otp: string): Promise<UserEntities | null> => {
      try {
        const result = await verifyOtp(email, otp);
        if (result) {
          return result;
        }
        return null;
      } catch (error: any) {
        console.error("something wrong in otpuseCase", error);
        return null
      }
    },
  };
};
