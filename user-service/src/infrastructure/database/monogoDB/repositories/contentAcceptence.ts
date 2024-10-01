import { contentEntities } from "@/domain/entities";
import { contentM } from "../models";


export const contentAcceptance=async(_id:string,AdminAccept:boolean):Promise<contentEntities|null>=>{
    try{
          console.log("repo", _id, AdminAccept, "gotit");
          const updateUser = await contentM.findByIdAndUpdate(
            _id,
            { AdminAccept},
            { new: true }
          );
          if (!updateUser) {
            return null;
          }
          return updateUser;
    }catch(error:any){
        console.error("something wrong in acceptence content");
    throw new Error(error?.message);
    }
}