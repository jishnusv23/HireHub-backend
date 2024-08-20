import { forgotPasswordMail } from "../../util/nodeMailer";

export const forgoPassMailHandler= async(data:{email:string,token:string}):Promise<string>=>{
    const {email,token}=data
    console.log("🚀 ~ file: forgotPassMailHandler.ts:5 ~ forgoPassMailHandler ~ data:", data)
    try{
        const NotifyData = {
          email,
          url: `${process.env.CLIENT_URL}?token=${token}`,
        };
        const response = await forgotPasswordMail(NotifyData);
        console.log("🚀 ~ file: forgotPassMailHandler.ts:11 ~ forgoPassMailHandler ~ response:", response)
        return response
    }catch(error:any){
        console.error('Something wrong in handling in forgotpasswMail',error);
        throw new Error(error?.message)
        
    }
}