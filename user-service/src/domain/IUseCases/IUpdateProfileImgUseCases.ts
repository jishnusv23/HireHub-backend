import { UserEntities } from "../entities";

export interface IUpdateProfileImgUseCases{
    execute:(email:string,url:string)=>Promise<UserEntities|null>
}