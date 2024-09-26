import { TechQuestion } from "../models";

export const getAllQuestions = async (
  page: number = 1,
  limit: number = 5,
  userId?: string
) => {
  try {
    const skipNo = (page - 1) * limit;
    const query: any = { userId };

    const totalPages = await TechQuestion.countDocuments(query);
    const data = await TechQuestion.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skipNo)
      .limit(limit);
    console.log("🚀 ~ file: getAllQuestions.ts:12 ~ data:", data);
    return {
      data,
      totalPages: Math.ceil(totalPages / limit),
      currentPage: page,
    };
  } catch (error: any) {
    console.error("Something wrong in getAllQuestions_______________", error);
    throw new Error(error?.message)
  }
};
