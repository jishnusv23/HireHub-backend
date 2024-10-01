import { contentM } from "../models";

export const getAllContentRequest=async(page:number=1,limit:number=5)=>{
    try{

          let skipNo = (page - 1) * limit;
          const query: any = { AdminAccept: false }; 
         const totalContents = await contentM.countDocuments(query);
         const data = await contentM
           .find(query)
           .sort({ createdAt: -1 })
           .skip(skipNo)
           .limit(limit);
         console.log("🚀 ~ file: getAllInterviewee.ts:20 ~ data:", data);
         return {
           data,
           totalPages: Math.ceil(totalContents / limit),
           currentPage: page,
         };
    }catch(error:any){
        console.error('something wrong in getAllContentRequest',error);
         throw new Error(error?.message);
    }
}