import { LanguageExecutor } from "../../Interface/LanguageExecutor";
import { FileService } from "../../services/FileService";
import { ExecutionResult, ProcessService } from "../../services/ProcessService";

export class PythonExecutor implements LanguageExecutor {
  constructor(
    private fileservice: FileService,
    private processService: ProcessService
  ) {}

  public async execute(code: string): Promise<ExecutionResult> {
    const filePath = await this.fileservice.createTempFile(code, ".py");
    try{
        return await this.processService.executeProcess(code,[filePath])
    }finally{
        await this.fileservice.removeTempFile(filePath)

    }
  }
}
