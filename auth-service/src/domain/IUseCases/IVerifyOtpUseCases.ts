import { IOtp, UserEntities } from "../entities";

export interface IVerifyOtpUseCases {
  execute(email: string, otp: string): Promise<UserEntities | null>;
}