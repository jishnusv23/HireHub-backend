import { IDependancies } from "../application/interface/IDependancies";
import * as repositories from "../infrastructure/database/monogoDB/repositories";
import * as useCases from '../application/useCases'

export const dependacies:IDependancies={
    repositories,
    useCases
}