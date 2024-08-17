import { UserEntities,IOtp } from "../../../../domain/entities";
import { Otp } from "../models/otpModel";

export const updateOTP=async(data:{email:string,otp:string}):Promise<IOtp|null>=>{

    try{
        const {email,otp}=data
        const result=await Otp.updateOne(
            {email:email},
            {otp:otp},
            {upsert:true,new:true}
        )
        if(!result){
            console.error('Otp creattion failed');
            return null
            
        }
        const updateOptVersion=await Otp.findOne({email:data.email})
        console.log("🚀 ~ file: updateOtp.ts:19 ~ updateOTP ~ updateOptVersion:", updateOptVersion)
        return updateOptVersion

    }catch(error:any){
        console.error('Something wrong in updateOtp',error);
        throw new Error(error?.message)
        
    }
}