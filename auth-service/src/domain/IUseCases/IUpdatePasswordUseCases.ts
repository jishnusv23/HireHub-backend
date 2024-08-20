import { UserEntities } from "../entities";

export interface IUpdatePasswordUseCases{
    execute(email:string,password:string):Promise<UserEntities|null>
}