import { NextFunction, Request, Response } from "express";
import { ExecutionService } from "../services/ExecutionService";

export class ExecutionController {
  private executionService: ExecutionService;
  constructor() {
    this.executionService = new ExecutionService();
  }

  public async executeCode(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log(
        req.body,
        "req.body verify the code and language here ___________________"
      );
      const { code, language } = req.body;
      const result = await this.executionService.execute(code, language);
      console.log(
        "🚀 ~ file: ExecutionController.ts:15 ~ ExecutionController ~ executeCode ~ result:",
        result
      );
          console.log("____my res", result.output);
      res.json({success:true,output:result.output,error:result.error});
    } catch (error: any) {
      res.status(505).json({ success: false, error: error?.message });
      next(error);
    }
  }
}

// export const Controller = {
//   ExecutionController: async (req: Request, res: Response,next:NextFunction) => {
//     try {
//         console.log(req.body,'execute code is here ')
//     } catch (error: any) {
//         next(error)
//     }
//   },
// };
