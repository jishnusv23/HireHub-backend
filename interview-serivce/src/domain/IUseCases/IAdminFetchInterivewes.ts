import { InterviewEntity } from "../entities";

export interface IAdminFetchInterivewesUseCases {
  execute: (
    page?: number,
    limit?: number
  ) => Promise<{
    data: InterviewEntity[];
    totalPages: number;
    currentPage: number;
  }>;
}