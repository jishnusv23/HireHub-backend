import { InterviewEntity } from "../../../../domain/entities";
import { interview } from "../models";

export const getAllMeetDetails=async(
    page:number=1,
    limit:number=5,
    id:string,
    search?:string
)=>{
    try{
         let skipNo = (page - 1) * limit;
             const query: any = {_id:id };
        //   if (search) {
        //     const searchQuery = new RegExp(search, "i");
        //     query.$or = [{ username: searchQuery }];
        //   }
          const totalInterveiwesData=await interview.countDocuments({_id:id})
            const data=await interview.find({_id:id}).skip(skipNo).limit(limit)
            console.log("🚀 ~ file: getAllMeetDetails.ts:19 ~ data:", data)
               return {
                 data,
                 totalPages: Math.ceil(totalInterveiwesData / limit),
                 currentPage: page,
               };
    }catch(error:any){
        throw new Error(error?.message)
    }
}