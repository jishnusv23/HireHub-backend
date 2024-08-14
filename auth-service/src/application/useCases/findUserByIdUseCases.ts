import { IDependancies } from "../interface/IDependancies";

export const findUserByIdUseCases = (dependancies: IDependancies) => {
  const {
    repositories: { findUserById },
  } = dependancies;

  return {
    execute: async (id: string) => {
        return await findUserById(id)
    },
  };
};
