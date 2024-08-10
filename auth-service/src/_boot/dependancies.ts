import { IDependancies } from "@/application/interface/IDependancies";
import * as repositories from "../infrastructure/database/mongoDB/repositories";
import * as useCases from "../application/useCases";

export const dependancies:IDependancies={
    repositories,
    useCases
}