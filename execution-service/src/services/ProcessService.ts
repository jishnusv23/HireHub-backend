import { spawn, ChildProcess } from "child_process";

export interface ExecutionResult {
  output: string;
  error?: string;
}

export class ProcessService {
  public executeProcess(
    command: string,
    args: string[]
  ): Promise<ExecutionResult> {
    return new Promise((resolve, reject) => {
      const process = spawn(command, args);
      let output = "";
      let errorOutPut = "";

      process.stdout.on("data", (data) => {
        output += data.toString();
      });

      process.stderr.on("data", (data) => {
        errorOutPut += data.toString();
      });

      process.on("close", (code) => {
        if (code == 0) {
          resolve({ output: output.trim() });
        } else {
          resolve({ output: output.trim(), error: errorOutPut.trim() });
        }
      });

      process.on("error", (err) => {
        reject(new Error(`Failed start a process:${err.message}`));
      });

      setTimeout(() => {
        process.kill();
        reject(new Error(`Execution Timed out`));
      }, 5000);
    });
  }
}
