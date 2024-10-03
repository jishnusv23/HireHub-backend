import { UserEntities } from "../entities";

export interface IUsersFetchAdminUseCases{
    execute:(id:string)=>Promise<UserEntities[]|null>
}