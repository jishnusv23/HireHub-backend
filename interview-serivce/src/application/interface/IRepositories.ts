import { InterviewEntity, TechQuestionEntities } from "../../domain/entities";

export interface IRepositories {
  createInterview: (data: InterviewEntity) => Promise<InterviewEntity | null>;
  getAllMeetDetails: (
    page?: number,
    limit?: number,
    id?: string,
    search?: string
  ) => Promise<{
    data: InterviewEntity[];
    totalPages: number;
    currentPage: number;
  }>;
  updateInterview: (
    data: InterviewEntity,
    id: string
  ) => Promise<InterviewEntity | null>;
  cancelInterview: (id: string) => Promise<InterviewEntity | null>;
  fetchCurrentInterview(
    uniqueId: string,
    interviewerId: string
  ): Promise<InterviewEntity | null>;
  MeetAccessInterviewee: (uniqueId: string) => Promise<InterviewEntity | null>;
  AddQuestions:(data:TechQuestionEntities)=>Promise<TechQuestionEntities|null>
}
