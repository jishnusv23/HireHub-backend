import { UserEntities } from "../../../../domain/entities";
import { User } from "../models";

export const getAllInterviewer = async (
  page: number = 1,
  limit: number = 5,
  search?: string
) => {
  try {
    let skipNo = (page - 1) * limit;
    const query: any = { role: "interviewer" };
    if (search) {
      const searchQuery = new RegExp(search, "i");
      query.$or = [{ username: searchQuery }];
    }

    const totalInterviewee = await User.countDocuments(query);

    const data = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skipNo)
      .limit(limit);
    console.log("🚀 ~ file: getAllInterviewee.ts:20 ~ data:", data);

    return {
      data,
      totalPages: Math.ceil(totalInterviewee / limit),
      currentPage: page,
    };
  } catch (error: any) {
    console.error("Something wrong getting all interviewee");
    throw new Error(error?.message || "something wrong in interviewee repo");
  }
};
