import { interview } from "../models";

export const AdminFetchInterivewes = async (page: number = 1, limit: number = 5) => {
  try {
      const skipNo = (page - 1) * limit;
    

      

 const totalInterviewsCount = await interview.countDocuments();
      const data = await interview
        .find({},)
        .sort({ createdAt: -1 })
        .skip(skipNo)
        .limit(limit);
      console.log("🚀 ~ file: AdminFetchInterivewes.ts:16 ~ AdminFetchInterivewes ~ data:", data)
      

      return {
        data,
        totalPages: Math.ceil(totalInterviewsCount / limit),
        currentPage: page,
      };
  } catch (error: any) {
    console.error("Something wrong in Admin Fetch Interivewes", error);
    throw new Error(error?.message);
  }
};