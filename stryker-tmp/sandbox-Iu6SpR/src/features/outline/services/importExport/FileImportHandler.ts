// @ts-nocheck
import { OutlineData } from '../../types/outline.types';
import { ImportResult, ImportContext } from './importTypes';
import { FileIOService } from './importExport/FileIOService';
import { ImportDataProcessor } from './ImportDataProcessor';
import { ImportConflictResolver } from './ImportConflictResolver';

export class FileImportHandler {
  static async importProjectFromFile(filePath: string): Promise<ImportResult> {
    const context: ImportContext = {
      warnings: [],
      errors: [],
      migrationApplied: false,
      originalVersion: undefined,
    };

    try {
      // Read and parse file
      const fileData = await FileIOService.readImportFile(filePath);

      if (!fileData) {
        return ImportDataProcessor.createImportResult(false, undefined, {
          ...context,
          errors: ['Failed to read import file'],
        });
      }

      // Extract project data
      const { projectData, metadata } = ImportDataProcessor.extractProjectMetadata(fileData);
      context.originalVersion = metadata?.version || projectData?.version;

      // Process import data
      const { data: migratedData, context: updatedContext } =
        await ImportDataProcessor.processImportData(projectData, context);

      // Handle ID conflicts
      const resolvedData = await ImportConflictResolver.resolveAllConflicts(migratedData);
      if (resolvedData.id !== migratedData.id) {
        updatedContext.warnings.push(
          `Project ID changed due to conflict: ${migratedData.id} → ${resolvedData.id}`
        );
      }

      // Success case
      if (updatedContext.errors.length === 0) {
        console.log(`Project imported successfully: ${resolvedData.projectName}`);
        return ImportDataProcessor.createImportResult(true, resolvedData, updatedContext);
      } else {
        return ImportDataProcessor.createImportResult(false, undefined, updatedContext);
      }
    } catch (error) {
      console.error('Import failed:', error);
      return ImportDataProcessor.createImportResult(false, undefined, {
        ...context,
        errors: [`Import failed: ${error.message}`],
      });
    }
  }

  static handleFileImport(file: File): Promise<ImportResult> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async event => {
        try {
          const content = event.target?.result as string;
          const data = JSON.parse(content);

          // Simulate file path for consistency
          const result = await this.importProjectData(data);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  }

  private static async importProjectData(data: any): Promise<ImportResult> {
    const context: ImportContext = {
      warnings: [],
      errors: [],
      migrationApplied: false,
      originalVersion: undefined,
    };

    try {
      const { projectData, metadata } = ImportDataProcessor.extractProjectMetadata(data);
      context.originalVersion = metadata?.version || projectData?.version;

      const { data: migratedData, context: updatedContext } =
        await ImportDataProcessor.processImportData(projectData, context);

      const resolvedData = await ImportConflictResolver.resolveAllConflicts(migratedData);
      if (resolvedData.id !== migratedData.id) {
        updatedContext.warnings.push(
          `Project ID changed due to conflict: ${migratedData.id} → ${resolvedData.id}`
        );
      }

      if (updatedContext.errors.length === 0) {
        return ImportDataProcessor.createImportResult(true, resolvedData, updatedContext);
      } else {
        return ImportDataProcessor.createImportResult(false, undefined, updatedContext);
      }
    } catch (error) {
      return ImportDataProcessor.createImportResult(false, undefined, {
        ...context,
        errors: [`Import processing failed: ${error.message}`],
      });
    }
  }
}
