import { contentEntities, UserEntities } from "../../domain/entities";
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
  updaetProfileImage: (
    email: string,
    url: string
  ) => Promise<UserEntities | null>;
  getAllInterviewer: (
    page?: number,
    limit?: number,
    search?: string
  ) => Promise<{
    data: UserEntities[];
    totalPages: number;
    currentPage: number;
  }>;
  contentCreate: (data: contentEntities) => Promise<contentEntities | null>;
  fetchAllContent: (
    page?: number,
    limit?: number
  ) => Promise<{
    data: contentEntities[];
    totalPages: number;
    currentPage: number;
  }>;
  updateHandClapp: (handClapp: number, id: string) => Promise<string | null>;
  getAllContentRequest:(page?:number,limit?:number)=>Promise<{data:contentEntities[],totalPages:number,currentPage:number}>
}