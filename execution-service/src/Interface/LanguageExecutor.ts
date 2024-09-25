import { ExecutionResult } from "../services/ProcessService";


export interface LanguageExecutor {
  execute(code: string): Promise<ExecutionResult>;
}
