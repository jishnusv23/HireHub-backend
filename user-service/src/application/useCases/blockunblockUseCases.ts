import { IDependancies } from "../interface/IDependancies";


export const blockunblockUseCases = (
  dependancies: IDependancies
)=> {
  const {
    repositories: { blockunblockUser },
  } = dependancies;

  return {
    execute: async (_id: string, isBlocked: boolean) => {
      return await blockunblockUser(_id, isBlocked);
    },
  };
};
