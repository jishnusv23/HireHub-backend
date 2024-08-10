import { IDependancies } from "../interface/IDependancies";
import { UserEntities } from "@/domain/entities";

export const createUserUseCases = (dependancies: IDependancies) => {
  const {
    repositories: { createUser },
  } = dependancies;
  return {
    execute: async (data: UserEntities) => {
      try {
        return await createUser(data);
      } catch (error: any) {
        throw new Error(error.message || "user connection failed");
      }
    },
  };
};
