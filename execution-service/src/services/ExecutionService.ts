import { extractContent } from "../utils/lib/extractContent";
import { LanguageExecutor } from "../Interface/LanguageExecutor";
import { JavaScriptExecutor } from "../utils/Languages/JavaScriptExecutor";
import { PythonExecutor } from "../utils/Languages/PythonExecutor";
import { FileService } from "./FileService";
import { ExecutionResult, ProcessService } from "./ProcessService";

export class ExecutionService {
  private executors: Map<string, LanguageExecutor>;

  constructor() {
    const fileService = new FileService();
    const processService = new ProcessService();

    this.executors = new Map<string, LanguageExecutor>([
      ["javascript", new JavaScriptExecutor(fileService, processService)],
      ["python", new PythonExecutor(fileService, processService)],
    ]);
  }

  public async execute(
    code: string,
    language: string
  ): Promise<ExecutionResult> {
    const executor = this.executors.get(language);
    if (!executor) {
      throw new Error(`Unsupported language:${language}`);
    }
    const res = await executor.execute(code);
    if(typeof res.output==='string'){
      res.output=extractContent(res.output)
    }
    console.log(res)
    console.log(JSON.stringify(res))
    return res;
  }
}
