import { InterviewEntity } from "../../../../domain/entities";
import { interview } from "../models";

export const getAllMeetDetails = async (
  page: number = 1,
  limit: number = 5,
  interviewerId?: string,
  search?: string
) => {
  try {
    const skipNo = (page - 1) * limit;
    const query: any = { interviewerId };

    if (search) {
      const searchQuery = new RegExp(search, "i");
      query.$or = [{ title: searchQuery }, { description: searchQuery }];
    }

    const totalInterveiwesData = await interview.countDocuments(query);
    const data = await interview
      .find({ interviewerId })
      .sort({ createdAt: -1 })
      .skip(skipNo)
      .limit(limit);
    console.log("🚀 ~ file: getAllMeetDetails.ts:19 ~ data:", data);

    return {
      data,
      totalPages: Math.ceil(totalInterveiwesData / limit),
      currentPage: page,
    };
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
