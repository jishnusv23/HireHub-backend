import { ICreateInterviewUsesCases } from "../../domain/IUseCases";

export interface IUseCases {
  IScheduleUseCases:(dependancies:any)=>ICreateInterviewUsesCases
}
