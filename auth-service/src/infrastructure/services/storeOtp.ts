import { Client } from "../../redis/redisClient";

export const storeOtp=async(email:string,otp:string):Promise<any>=>{
    try{
        const key=`otp:${email}`
        const ttl=300;
    
        await Client.set(key,otp,'EX',ttl)
        const value=await Client.get(key)
        return `otp ${value} stored for email ${email} with expire ${ttl} seconds`

    }catch(error:any){
        console.error('Something wrong in storeOtp');
        throw new Error(error?.message)
    }
}