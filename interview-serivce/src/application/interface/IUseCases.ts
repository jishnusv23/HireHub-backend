import { ICreateInterviewUsesCases,IGetAllInterviewesForUseCases } from "../../domain/IUseCases";

export interface IUseCases {
  IScheduleUseCases: (dependancies: any) => ICreateInterviewUsesCases;
  IGetAllMeetDetailsUseCases:(dependancies:any)=>IGetAllInterviewesForUseCases
}
