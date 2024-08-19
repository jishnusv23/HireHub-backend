import { UserEntities } from "../entities";

export interface IStatusUseCases{
    execute:(id:string,isBlocked:boolean)=>Promise<UserEntities|null>
}