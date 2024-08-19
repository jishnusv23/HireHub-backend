import { IFindUserByIdUseCases, IGetAllVieweeUseCases,IBlockUnblockUseCases } from "../../domain/IUseCases";

export interface IUseCases {
  findUserByIdUseCases: (dependancies: any) => IFindUserByIdUseCases;
  getAllIntervieweesUseCases: (dependancies: any) => IGetAllVieweeUseCases;
  blockUnblockUserUseCase: (dependancies: any) => IBlockUnblockUseCases;
}