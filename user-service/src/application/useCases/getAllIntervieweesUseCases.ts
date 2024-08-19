import { IDependancies } from "../interface/IDependancies";

export const getAllIntervieweesUseCases = (dependancies: IDependancies) => {
  const {
    repositories: { getAllInterviewee },
  } = dependancies;
  return {
    execute: async (page?: number, limit?: number, search?: string) => {
      return await getAllInterviewee(page, limit, search);
    },
  };
};
