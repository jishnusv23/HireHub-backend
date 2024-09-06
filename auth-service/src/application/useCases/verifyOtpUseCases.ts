import { IOtp, UserEntities } from "../.../../../domain/entities";
import { IDependancies } from "../interface/IDependancies";

export const verifyOtpUseCases = (dependancies: IDependancies) => {
  const {
    repositories: { verifyOtp },
  } = dependancies;
  return {
    execute: async (datas: UserEntities, otp: string): Promise<UserEntities | null> => {
      console.log("🚀 ~ file: verifyOtpUseCases.ts:10 ~ execute: ~ email: string, otp: string:", datas.email, otp)
      try {
        
        const result = await verifyOtp(datas, otp);
        console.log("🚀 ~ file: verifyOtpUseCases.ts:14 ~ execute: ~ result:", result)
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
