import { query } from "express";
import { UserEntities } from "../../../../domain/entities";
import { User } from "../models";

export const getAllInterviewee = async (
  page: number = 1,
  limit: number = 5,
  search: string
) => {
  try {
    let skipNo = (page - 1) * limit;
    //*after change this oke
    const query: any = { role: "penindg" };
    if (search) {
      const searchQuery = new RegExp(search, "i");
      query.$or = [{ username: searchQuery }];
    }

    //*finding
    const totalInterviewee = await User.countDocuments(query);

    const data = await User.find(query).skip(skipNo).limit(limit);

    return {
      data,
      totalPages: Math.ceil(totalInterviewee / limit),
      currentPage: page,
    };
  } catch (error: any) {
    console.error("Soemting wrong geting all interviewee");
    
    throw new Error(error?.message||'something wrong  intervewee repo')
  }
};
