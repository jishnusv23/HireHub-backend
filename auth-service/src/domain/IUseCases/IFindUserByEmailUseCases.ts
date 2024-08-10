import { UserEntities } from "../entities";

export interface IFindUserByEmailUseCases {
  execute(email:string):Promise<UserEntities|null>;
  
}
