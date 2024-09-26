import { IDependancies } from "../interface/IDependancies";

export const getAllInterviewerUseCases = (dependancies: IDependancies) => {
  const {
    repositories: { getAllInterviewer },
  } = dependancies;

  return {
    execute: async (page: number = 1, limit: number = 5, search?: string) => {
      // Make search optional
      return await getAllInterviewer(page, limit, search);
    },
  };
};
