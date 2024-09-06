import { IOtp, UserEntities } from "../entities";

export interface IVerifyOtpUseCases {
  execute(datas: UserEntities, otp: string): Promise<UserEntities | null>;
}