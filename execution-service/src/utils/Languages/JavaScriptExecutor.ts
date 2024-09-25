import { FileService } from "../../services/FileService";
import { LanguageExecutor } from "../../Interface/LanguageExecutor";
import { ExecutionResult, ProcessService } from "../../services/ProcessService";

export class JavaScriptExecutor implements LanguageExecutor {
  constructor(
    private fileservice: FileService,
    private processService: ProcessService
  ) {}

  public async execute(code: string): Promise<ExecutionResult> {
    const filePath = await this.fileservice.createTempFile(code, ".js");
    try {
      return await this.processService.executeProcess("node", [filePath]);
    } finally {
      await this.fileservice.removeTempFile(filePath);
    }
  }
}
