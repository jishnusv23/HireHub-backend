import { UserEntities } from "../entities";

export interface IBlockUnblockUseCases{
    execute:(_id:string,isBlocked:boolean)=>Promise<UserEntities|null>
}