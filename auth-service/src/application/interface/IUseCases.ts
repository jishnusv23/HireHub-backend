import {
  ICreateUserUseCases,
  IFindUserByEmailUseCases,
} from "@/domain/IUseCases";

export interface IUseCases {
  findUserByEmailUseCases: (dependancies: any) => IFindUserByEmailUseCases;
  createUserUseCases:(dependancies:any)=>ICreateUserUseCases
}
