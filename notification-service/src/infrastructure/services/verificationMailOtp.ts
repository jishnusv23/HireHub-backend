import { SendVerificationMail } from "@/util/nodeMailer"

export const verificationOtp=async(data:{email:string,otp:string}):Promise<string>=>{
    const {email,otp}=data
    
    try{
        const result=await SendVerificationMail(data.email,data.otp)
     console.log(
       "🚀 ~ file: verificationMailOtp.ts:5 ~ verificationOtp ~ result:",
       result
     );
     return result

    }catch(error:any){
        console.error('Error in verificationOtp function:',error);
        throw error
        
    }
    
}