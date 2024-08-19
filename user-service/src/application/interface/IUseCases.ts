import { IFindUserByIdUseCases, IGetAllVieweeUseCases,IStatusUseCases } from "../../domain/IUseCases";

export interface IUseCases {
  findUserByIdUseCases: (dependancies: any) => IFindUserByIdUseCases;
  getAllIntervieweesUseCases: (dependancies: any) => IGetAllVieweeUseCases;
  statusUpdateUseCases:(dependancies:any)=>IStatusUseCases
}