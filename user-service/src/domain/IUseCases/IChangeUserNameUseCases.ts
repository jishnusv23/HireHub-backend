import { UserEntities } from "../entities";

export interface IChangeUserNameUseCases{
    execute:(name:string,id:string)=>Promise<UserEntities|null>
}