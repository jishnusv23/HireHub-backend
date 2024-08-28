import { InterviewEntity } from "../entities";

export interface IGetAllInterviewesForUseCases{
    execute:(
        page?:number,
        limit?:number,
        id?:string,
        search?:string
    )=>Promise<{data:InterviewEntity[],totalPages:number,currentPage:number}>
}