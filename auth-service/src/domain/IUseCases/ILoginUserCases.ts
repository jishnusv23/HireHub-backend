import { UserEntities } from "../entities";

export interface ILoginUserCases{
    execute(email:string,password:string):Promise<UserEntities|null>
}