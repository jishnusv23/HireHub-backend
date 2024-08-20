import { UserEntities } from "@/domain/entities";
import { IOtp } from "@/domain/entities";

export interface IRepositories {
  findUserByEmail: (email: string) => Promise<UserEntities | null>;
  createUser: (data: UserEntities) => Promise<UserEntities | null>;
  verifyOtp: (email: string, otp: string) => Promise<UserEntities | null>;
  findUserById: (id: string) => Promise<UserEntities | null>;
  updatePassword:(email:string,password:string)=>Promise<UserEntities|null>
}
