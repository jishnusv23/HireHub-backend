import { UserEntities } from "../../../../domain/entities";
import { User } from "../models";

export const getAllInterviewee = async (
  page: number = 1,
  limit: number = 5,
  search?: string // Update to optional
) => {
  try {
    let skipNo = (page - 1) * limit;
    const query: any = { role: "pending" }; // Assuming role is "pending"
    if (search) {
      const searchQuery = new RegExp(search, "i");
      query.$or = [{ username: searchQuery }];
    }

    const totalInterviewee = await User.countDocuments(query);

    const data = await User.find(query).skip(skipNo).limit(limit);
    console.log("🚀 ~ file: getAllInterviewee.ts:20 ~ data:", data)

    // Map rawData to UserEntities
    // const data: UserEntities[] = rawData.map((doc) => ({
    //   _id: doc._id,
    //   username: doc.username,
    //   email: doc.email,
    //   password: doc.password, // Ensure this is included if required
    //   role: doc.role,
    //   isBlocked: doc.isBlocked,
    //   // Map other properties as needed
    // }));
    // const data=await User.find()
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
