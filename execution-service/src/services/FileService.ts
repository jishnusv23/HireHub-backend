import { writeFile, unlink } from "fs/promises";
import path from "path";

export class FileService {
    //*for create file store temporary
  public async createTempFile(
    code: string,
    extension: string
  ): Promise<string> {
    const fileName = `temp_${Date.now()}${extension}`;
    const filePath = path.join(__dirname, fileName); //!without store the file in another folder
    await writeFile(filePath, code);
    return filePath;
  }

  //*for handling removtempflie

  public async removeTempFile(filePath: string): Promise<void> {
    try {
        await unlink(filePath)
    } catch (error: any) {
      console.error(`something wrong in removeTempFile`, error);
    }
  }
}
