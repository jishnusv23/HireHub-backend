import { ICreateInterviewUsesCases,IGetAllInterviewesForUseCases,IUpdateInterviewUseCases,ICancelInterviewUseCases,IFetchCurrentInterviewUseCases,IMeetAccessIntervieweeUseCases,IAddquestionUseCases,IGetAllQuestionsUseCases } from "../../domain/IUseCases";

export interface IUseCases {
  IScheduleUseCases: (dependancies: any) => ICreateInterviewUsesCases;
  IGetAllMeetDetailsUseCases: (
    dependancies: any
  ) => IGetAllInterviewesForUseCases;
  IUpdateUseCases: (dependancies: any) => IUpdateInterviewUseCases;
  ICancelInterviewUseCases: (dependancies: any) => ICancelInterviewUseCases;
  IFetchCurrentInterveiwUseCases: (
    dependancies: any
  ) => IFetchCurrentInterviewUseCases;
  IMeetAccessIntervieweeUseCases: (
    dependancies: any
  ) => IMeetAccessIntervieweeUseCases;
  IAddquestionUseCases: (dependancies: any) => IAddquestionUseCases;
  IGetAllQuestionUseCases:(dependancies:any)=>IGetAllQuestionsUseCases
}
