import { IOtp } from "../entities";

export interface IVerifyOtpUseCases {
  execute(email: string, otp: string): Promise<IOtp | null>;
}