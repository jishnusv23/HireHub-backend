import { UserEntities } from "../../../../domain/entities";
import { User } from "../models";

export const findByEmail = async (data: string): Promise<UserEntities | null> => {
        try{
              let user = null;

              console.log(data,'kkkkkkk');
              if (data) {
                user = await User.findOne({ email:data });
                console.log(
                  "🚀 ~ file: findUserByEmail.ts:10 ~ findByEmail ~ user:",
                  user
                );

                if (user) return user;
              }
              return user;
        }catch(error:any){
            console.error('Something wrong in findExsits');
            throw new Error('Failed user fetch')
            
        }
        
};