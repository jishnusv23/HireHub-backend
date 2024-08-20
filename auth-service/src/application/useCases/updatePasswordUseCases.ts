import { response } from "express";
import { IDependancies } from "../interface/IDependancies";

export const updatePasswordUseCases = (dependancies: IDependancies) => {
  const {
    repositories: { updatePassword },
  } = dependancies;
  return {
    execute: async (email: string, password: string) => {
      try {
        const reponose=await updatePassword(email,password)
        
        if(reponose) return response


        return null
      } catch (error: any) {
        console.error("Something wrong in updapassUseCases", error);
        return null;
      }
    },
  };
};
