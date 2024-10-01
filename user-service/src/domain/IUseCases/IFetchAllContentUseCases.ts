import { contentEntities } from "../entities";

export interface IFetchAllContentUseCases {
  execute: (
    page?: number,
    limit?: number
  ) => Promise<{
    data: contentEntities[];
    totalPages: number;
    currentPage: number;
  }>;
}