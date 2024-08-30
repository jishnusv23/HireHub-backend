import { ICreateInterviewUsesCases,IGetAllInterviewesForUseCases,IUpdateInterviewUseCases,ICancelInterviewUseCases } from "../../domain/IUseCases";

export interface IUseCases {
  IScheduleUseCases: (dependancies: any) => ICreateInterviewUsesCases;
  IGetAllMeetDetailsUseCases: (
    dependancies: any
  ) => IGetAllInterviewesForUseCases;
  IUpdateUseCases: (dependancies: any) => IUpdateInterviewUseCases;
  ICancelInterviewUseCases:(dependancies:any)=>ICancelInterviewUseCases
}
