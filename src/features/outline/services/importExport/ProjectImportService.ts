/**
 * Project Import Service
 * Handles importing single projects with validation and migration
 */

import { OutlineData } from '../types/outline.types';
import { localStorageService } from './localStorageService';
import { DataMigrationService } from '../dataMigrationService';
import { FileIOService } from './importExport/FileIOService';
import { ImportValidationService } from './importExport/ImportValidationService';

export interface ImportResult {
  success: boolean;
  project?: OutlineData;
  warnings: string[];
  errors: string[];
  migrationApplied: boolean;
  originalVersion?: string;
}

export class ProjectImportService {
  /**
   * Import project from file
   */
  static async importProject(filePath: string): Promise<ImportResult> {
    const warnings: string[] = [];
    const errors: string[] = [];
    let migrationApplied = false;
    let originalVersion: string | undefined;

    try {
      // Read and parse file
      const fileData = await FileIOService.readImportFile(filePath);
      
      if (!fileData) {
        return {
          success: false,
          warnings,
          errors: ['Failed to read import file'],
          migrationApplied: false
        };
      }

      // Extract project data
      const { projectData, metadata } = FileIOService.extractProjectData(fileData);
      originalVersion = metadata?.version || projectData?.version;

      // Validate basic structure
      const basicValidation = ImportValidationService.validateImportData(projectData);
      if (!basicValidation.isValid) {
        errors.push(...basicValidation.errors);
        warnings.push(...basicValidation.warnings);
      }

      // Apply migration if needed
      let migratedData = projectData;
      if (DataMigrationService.needsMigration(projectData)) {
        console.log('Migration needed, applying...');
        try {
          migratedData = await DataMigrationService.migrateToCurrentVersion(projectData);
          migrationApplied = true;
          warnings.push(`Data migrated from version ${originalVersion} to current version`);
        } catch (migrationError) {
          errors.push(`Migration failed: ${migrationError.message}`);
        }
      }

      // Final validation
      const finalValidation = ImportValidationService.validateFinalImportData(migratedData);
      if (!finalValidation.isValid) {
        errors.push(...finalValidation.errors);
        warnings.push(...finalValidation.warnings);
      }

      // Handle ID conflicts
      const resolvedData = await this.resolveProjectIdConflicts(migratedData);
      if (resolvedData.id !== migratedData.id) {
        warnings.push(`Project ID changed due to conflict: ${migratedData.id} → ${resolvedData.id}`);
      }

      // Success case
      if (errors.length === 0) {
        console.log(`Project imported successfully: ${resolvedData.projectName}`);
        return {
          success: true,
          project: resolvedData,
          warnings,
          errors,
          migrationApplied,
          originalVersion
        };
      } else {
        return {
          success: false,
          warnings,
          errors,
          migrationApplied,
          originalVersion
        };
      }

    } catch (error) {
      console.error('Import failed:', error);
      return {
        success: false,
        warnings,
        errors: [`Import failed: ${error.message}`],
        migrationApplied,
        originalVersion
      };
    }
  }

  /**
   * Handle file input for web version
   */
  static handleFileImport(file: File): Promise<ImportResult> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
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
    // This is a helper method that processes the data directly
    // without file I/O operations
    const warnings: string[] = [];
    const errors: string[] = [];
    let migrationApplied = false;
    let originalVersion: string | undefined;

    try {
      const { projectData, metadata } = FileIOService.extractProjectData(data);
      originalVersion = metadata?.version || projectData?.version;

      const basicValidation = ImportValidationService.validateImportData(projectData);
      if (!basicValidation.isValid) {
        errors.push(...basicValidation.errors);
        warnings.push(...basicValidation.warnings);
      }

      let migratedData = projectData;
      if (DataMigrationService.needsMigration(projectData)) {
        migratedData = await DataMigrationService.migrateToCurrentVersion(projectData);
        migrationApplied = true;
        warnings.push(`Data migrated from version ${originalVersion} to current version`);
      }

      const finalValidation = ImportValidationService.validateFinalImportData(migratedData);
      if (!finalValidation.isValid) {
        errors.push(...finalValidation.errors);
        warnings.push(...finalValidation.warnings);
      }

      const resolvedData = await this.resolveProjectIdConflicts(migratedData);
      if (resolvedData.id !== migratedData.id) {
        warnings.push(`Project ID changed due to conflict: ${migratedData.id} → ${resolvedData.id}`);
      }

      if (errors.length === 0) {
        return {
          success: true,
          project: resolvedData,
          warnings,
          errors,
          migrationApplied,
          originalVersion
        };
      } else {
        return {
          success: false,
          warnings,
          errors,
          migrationApplied,
          originalVersion
        };
      }

    } catch (error) {
      return {
        success: false,
        warnings,
        errors: [`Import processing failed: ${error.message}`],
        migrationApplied,
        originalVersion
      };
    }
  }

  private static async resolveProjectIdConflicts(projectData: OutlineData): Promise<OutlineData> {
    const existingProjects = await localStorageService.getProjectList();
    const existingIds = existingProjects.map(p => p.id);

    if (existingIds.includes(projectData.id)) {
      // Generate new ID
      const timestamp = Date.now();
      const newId = `${projectData.id}_imported_${timestamp}`;
      
      return {
        ...projectData,
        id: newId,
        projectName: `${projectData.projectName} (Imported)`
      };
    }

    return projectData;
  }
}