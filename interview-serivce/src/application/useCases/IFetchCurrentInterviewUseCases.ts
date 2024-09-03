import { IDependancies } from "../interface/IDependancies";
import { InterviewEntity } from "../../domain/entities";

export const IFetchCurrentInterveiwUseCases=(dependancies:IDependancies)=>{
    const {repositories:{fetchCurrentInterview}}=dependancies
    return {
      execute: async (uniqueId: string, interviewerId: string) => {
        try {
            return await fetchCurrentInterview(uniqueId,interviewerId)
        } catch (error: any) {
            console.error(
                'Something wrong in fetchcurrentUseCases',error
            );
            throw new Error(error?.message)
            
        }
      },
    };
}