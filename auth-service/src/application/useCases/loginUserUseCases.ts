import { UserEntities } from "@/domain/entities";
import { IDependancies } from "../interface/IDependancies";
import { IRepositories } from "../interface/IRespositories";
import { compare } from "bcrypt";

export const loginUserUseCases = (dependancies: IDependancies) => {
  const {
    repositories: { findUserByEmail },
  } = dependancies;
  return {
    execute: async (
      email: string,
      password: string
    ): Promise<UserEntities | null> => {
      try {
        const user = await findUserByEmail(email);
        if (!user) {
          throw new Error("user not found");
        }
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
          throw new Error("Password is not match");
        }
        return user;
      } catch (error: any) {
        console.error("Login user Case showing error",error?.message);
        
        return null;
      }
    },
  };
};
