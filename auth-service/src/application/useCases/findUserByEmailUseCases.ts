import { IDependancies } from "../interface/IDependancies";

export const findUserByEmailUseCases = (dependancies: IDependancies) => {
  const {
    repositories: { findUserByEmail },
  } = dependancies;
  return {
    execute: async (email: string) => {
      return await findUserByEmail(email)
    },
  };
};
