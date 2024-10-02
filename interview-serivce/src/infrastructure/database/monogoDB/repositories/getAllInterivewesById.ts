import { interview } from "../models";


export const getAllInterivewesById=async(id:string)=>{
 try{
    const allInteivewes=await interview.findById(id)
    console.log("🚀 ~ file: getAllInterivewesById.ts:7 ~ getAllInterivewesById ~ allInteivewes:", allInteivewes)
    if(allInteivewes){
        return allInteivewes
    }else{
        return null
    }
    
 }  catch(error:any){
    console.error('something wrong in getAllsInterviewerById',error);
    throw new Error(error?.message)
    
 } 
}