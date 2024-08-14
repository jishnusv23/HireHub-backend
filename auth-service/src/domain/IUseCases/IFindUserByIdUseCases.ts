import { UserEntities } from "../entities";

export interface IFindUserByIdUseCases{
    execute(id:string):Promise<UserEntities|null>
}