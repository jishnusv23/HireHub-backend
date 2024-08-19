import { UserEntities } from "../entities";

export interface IGetAllVieweeUseCases {
  execute: (
    page?: number,
    limit?: number,
    search?: string
  ) => Promise<{
    data: UserEntities[];
    totalPages: number;
    currentPage: number;
  }>;
}
