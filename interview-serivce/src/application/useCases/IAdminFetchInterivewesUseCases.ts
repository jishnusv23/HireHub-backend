import { IDependancies } from "../interface/IDependancies";


export const IAdminFetchInterivewesUseCases=(dependancies:IDependancies)=>{
    const {repositories:{AdminFetchInterivewes}}=dependancies

    return {
      execute: async (page: number = 1, limit: number = 5) => {
        return await AdminFetchInterivewes(page,limit)
      },
    };
}