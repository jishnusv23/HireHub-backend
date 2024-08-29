import { IDependancies } from "../interface/IDependancies";

export const IGetAllMeetDetailsUseCases = (dependacies: IDependancies) => {
  const {
    repositories: { getAllMeetDetails },
  } = dependacies;

  return {
    execute: async (
      page: number = 1,
      limit: number = 5,
      interviewerId?: string,
      search?: string
    ) => {
      return await getAllMeetDetails(page, limit, interviewerId, search);
    },
  };
};
