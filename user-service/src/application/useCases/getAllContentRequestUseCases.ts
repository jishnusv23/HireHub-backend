import { IDependancies } from "../interface/IDependancies";


export const getallContentRequestUseCases=(dependancies:IDependancies)=>{
    const {repositories:{getAllContentRequest}}=dependancies

    return {
        execute:async(page:number=1,limit:number=5)=>{
            return getAllContentRequest(page,limit)
        }
    }
}