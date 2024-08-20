import {
  ICreateUserUseCases,
  IFindUserByEmailUseCases,
  ILoginUserCases,
  IGoogleUserUseCase,
  IFindUserByIdUseCases,
  IVerifyOtpUseCases,
  IUpdatePasswordUseCases
  

  
} from "@/domain/IUseCases";

export interface IUseCases {
  findUserByEmailUseCases: (dependancies: any) => IFindUserByEmailUseCases;
  createUserUseCases: (dependancies: any) => ICreateUserUseCases;
  loginUserUseCases: (dependancies: any) => ILoginUserCases;
  googleLoginUseCases: (dependancies: any) => IGoogleUserUseCase;
  findUserByIdUseCases: (dependacies: any) => IFindUserByIdUseCases;
  verifyOtpUseCases: (dependancies: any) => IVerifyOtpUseCases;
  updatePasswordUseCases:(dependancies:any)=>IUpdatePasswordUseCases
}
