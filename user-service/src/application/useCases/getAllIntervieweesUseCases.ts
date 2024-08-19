
import { IDependancies } from "../interface/IDependancies";

export const getAllIntervieweesUseCases = (
  dependancies: IDependancies
) => {
  const {
    repositories: { getAllInterviewee },
  } = dependancies;

  return {
    execute: async (page: number = 1, limit: number = 5, search?: string) => {
      // Make search optional
      return await getAllInterviewee(page, limit, search);
    },
  };
};
