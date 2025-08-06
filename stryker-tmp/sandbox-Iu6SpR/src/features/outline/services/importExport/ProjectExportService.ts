/**
 * Project Export Service
 * Handles exporting single projects with various format options
 */
// @ts-nocheck


import { OutlineData } from '../types/outline.types';
import { localStorageService } from './localStorageService';
import { FileIOService } from './importExport/FileIOService';
import { ImportValidationService } from './importExport/ImportValidationService';
import { ExportHelpers } from './importExport/ExportHelpers';

export type ExportFormat = 'json' | 'json-pretty' | 'backup';

export interface ExportOptions {
  format: ExportFormat;
  includeMetadata: boolean;
  compression: boolean;
  encryption: boolean;
}

export interface ExportResult {
  success: boolean;
  filePath?: string;
  size?: number;
  errors: string[];
}

export class ProjectExportService {
  /**
   * Export project to file
   */
  static async exportProject(
    projectId: string,
    filePath: string,
    options: Partial<ExportOptions> = {}
  ): Promise<ExportResult> {
    const defaultOptions: ExportOptions = {
      format: 'json-pretty',
      includeMetadata: true,
      compression: false,
      encryption: false,
    };

    const exportOptions = { ...defaultOptions, ...options };
    const errors: string[] = [];

    try {
      // Load project data
      const projectData = await localStorageService.loadProject(projectId);

      if (!projectData) {
        return {
          success: false,
          errors: [`Project ${projectId} not found`],
        };
      }

      // Prepare export data
      const exportData = ExportHelpers.prepareExportData(projectData, exportOptions);

      // Validate export data
      const validationResult = ImportValidationService.validateExportData(exportData);
      if (!validationResult.isValid) {
        errors.push(...validationResult.errors);
      }

      // Write to file
      await FileIOService.writeExportFile(filePath, exportData, exportOptions);

      // Get file size
      const fileSize = await FileIOService.getFileSize(filePath);

      console.log(`Project exported successfully to: ${filePath}`);

      return {
        success: true,
        filePath,
        size: fileSize,
        errors: errors,
      };
    } catch (error) {
      console.error('Export failed:', error);
      return {
        success: false,
        errors: [`Export failed: ${error.message}`],
      };
    }
  }
}
