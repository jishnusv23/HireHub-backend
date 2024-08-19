import { IFindUserByIdUseCases, IGetAllVieweeUseCases,IBlockUnblockUseCases } from "../../domain/IUseCases";

export interface IUseCases {
  findUserByIdUseCases: (dependancies: any) => IFindUserByIdUseCases;
  getAllIntervieweesUseCases: (dependancies: any) => IGetAllVieweeUseCases;
  blockunblockUseCases:(dependancies:any)=>IBlockUnblockUseCases
}