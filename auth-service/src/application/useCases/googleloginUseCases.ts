import { IDependancies } from "../interface/IDependancies";
import { User } from "../../infrastructure/database/mongoDB/models";

export const googleLoginUseCases = (dependancies: IDependancies) => {
  return {
    execute: async (data: any) => {

      try {
        const {email,given_name}:any=data
        if(!email) {
            console.log(
              "----------------------------email----------------------------------"
            );
        }
        const user=await User.findOne({email})
        if(user) return user
        console.log(data,'google usecase');
        const newUser=new User({
            email:email?? '',
            username:given_name,
            password:'thankYou....',
            isGAuth:true,
            role:'pending'
        })
        return await newUser.save()
      } catch (error: any) {
        console.error("showing googleusecases", error);
      }
    },
  };
};
