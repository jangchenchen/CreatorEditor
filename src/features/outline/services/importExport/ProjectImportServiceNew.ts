import { ImportResult } from './importTypes';
import { FileImportHandler } from './FileImportHandler';

export class ProjectImportServiceNew {
  /**
   * Import project from file
   */
  static async importProject(filePath: string): Promise<ImportResult> {
    return FileImportHandler.importProjectFromFile(filePath);
  }

  /**
   * Handle file input for web version
   */
  static handleFileImport(file: File): Promise<ImportResult> {
    return FileImportHandler.handleFileImport(file);
  }
}