import { contentEntities } from "../entities";

export interface IGetAllContentRequestUseCases {
  execute: (
    page?: number,
    limit?: number
  ) => Promise<{
    data: contentEntities[];
    totalPages: number;
    currentPage: number;
  }>;
}