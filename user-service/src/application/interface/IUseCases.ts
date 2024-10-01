import { IFindUserByIdUseCases, IGetAllVieweeUseCases,IStatusUseCases,IUpdateProfileImgUseCases,IGetAllInterivewerUseCases,ICreateUseCases,IFetchAllContentUseCases } from "../../domain/IUseCases";

export interface IUseCases {
  findUserByIdUseCases: (dependancies: any) => IFindUserByIdUseCases;
  getAllIntervieweesUseCases: (dependancies: any) => IGetAllVieweeUseCases;
  statusUpdateUseCases: (dependancies: any) => IStatusUseCases;
  updateProfileUseCases: (dependancies: any) => IUpdateProfileImgUseCases;
  getAllInterviewerUseCases: (dependancies: any) => IGetAllInterivewerUseCases;
  ICreateContentUseCases: (depandancies: any) => ICreateUseCases;
  fetchAllContentUseCases:(depandancies:any)=>IFetchAllContentUseCases
}