import { contentM } from "../models";

export const fetchAllContent=async(page:number=1,limit:number=8)=>{
  try{
    let skipNo = (page - 1) * limit;
    const query: any = { AdminAccept:true }; 
    const totalContents=await contentM.countDocuments(query)
     const data = await contentM.find(query)
       .sort({ createdAt: -1 })
       .skip(skipNo)
       .limit(limit);
    //  console.log("🚀 ~ file: getAllInterviewee.ts:20 ~ data:", data);
     return {
       data,
       totalPages: Math.ceil(totalContents / limit),
       currentPage: page,
     };
  }catch(error:any){
    console.error('Something wrong in fetchAllContent',error);
    throw new Error(error?.message)
    
  }
}