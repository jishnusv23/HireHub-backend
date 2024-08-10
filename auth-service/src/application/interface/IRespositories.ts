import { UserEntities } from "@/domain/entities";
import { IOtp } from "@/domain/entities";

export interface IRepositories {
  findUserByEmail: (email: string) => Promise<UserEntities | null>;
  createUser: (data: UserEntities) => Promise<UserEntities | null>;
}
