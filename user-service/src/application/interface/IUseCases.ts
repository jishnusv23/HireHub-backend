import { IFindUserByIdUseCases, IGetAllVieweeUseCases } from "../../domain/IUseCases";

export interface IUseCases {
  findUserByIdUseCases: (dependancies: any) => IFindUserByIdUseCases;
  getAllIntervieweesUseCases: (dependancies: any) => IGetAllVieweeUseCases;
}