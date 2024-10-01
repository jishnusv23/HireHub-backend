import { IDependancies } from "../interface/IDependancies";

export const fetchAllContentUseCases=(dependancies:IDependancies)=>{
    const {repositories:{fetchAllContent}}=dependancies

    return {
        execute:async(page:number=1,limit:number=8)=>{
                return await fetchAllContent(page,limit)
        }
    }
}