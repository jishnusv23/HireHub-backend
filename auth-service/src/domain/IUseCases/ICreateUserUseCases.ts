import { UserEntities } from "../entities";

export interface ICreateUserUseCases {
  execute(data: UserEntities): Promise<UserEntities | null>;
}
