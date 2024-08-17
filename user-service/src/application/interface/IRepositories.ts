import { UserEntities } from "../../domain/entities";
import { IOtp } from "../../domain/entities";

export interface IRepositories{
    findUserById:(id:string)=>Promise<UserEntities|null>
}