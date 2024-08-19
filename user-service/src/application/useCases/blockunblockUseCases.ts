import { IDependancies } from "../interface/IDependancies";

export const blockUnblockUserUseCase = (dependencies: IDependancies) => {
  const {
    repositories: { blockunblockUser },
  } = dependencies;
  return {
    execute: async (id: string, isBlocked: boolean) => {
      return await blockunblockUser(id, isBlocked);
    },
  };
};
