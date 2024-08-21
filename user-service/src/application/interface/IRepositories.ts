import { UserEntities } from "../../domain/entities";
import { IOtp } from "../../domain/entities";

export interface IRepositories {
  findUserById: (id: string) => Promise<UserEntities | null>;
  getAllInterviewee: (
    page?: number,
    limit?: number,
    search?: string
  ) => Promise<{
    data: UserEntities[];
    totalPages: number;
    currentPage: number;
  }>;
  statusUpdate: (
    id: string,
    isBlocked: boolean
  ) => Promise<UserEntities | null>;
  updaetProfileImage:(email:string,url:string)=>Promise<UserEntities|null>
}