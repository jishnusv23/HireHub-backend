import { InterviewEntity } from "../../domain/entities";
import { IDependancies } from "../interface/IDependancies";
export const IScheduleUseCases = (dependancies: IDependancies) => {
  const {
    repositories: { createInterview },
  } = dependancies;
  return {
    execute: async (data: InterviewEntity) => {
      try {
        console.log(data);
        return await createInterview(data);
      } catch (error: any) {
        throw new Error(error?.message||'Interview creation failed')
      }
    },
  };
};
