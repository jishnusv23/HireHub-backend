import { contentEntities } from "../entities";


export interface ICreateUseCases{
    execute(data:contentEntities):Promise<contentEntities|null>
}