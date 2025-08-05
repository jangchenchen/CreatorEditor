import { OutlineData } from '../../types/outline.types';
import { ImportResult, ImportContext } from './importTypes';
import { FileIOService } from './importExport/FileIOService';
import { ImportValidationService } from './importExport/ImportValidationService';
import { DataMigrationService } from '../dataMigrationService';

export class ImportDataProcessor {
  static async processImportData(
    projectData: any, 
    context: ImportContext
  ): Promise<{ data: OutlineData; context: ImportContext }> {
    const { warnings, errors, migrationApplied, originalVersion } = context;

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
        context.migrationApplied = true;
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

    return { data: migratedData, context };
  }

  static createImportResult(
    success: boolean, 
    project?: OutlineData, 
    context: ImportContext
  ): ImportResult {
    return {
      success,
      project,
      warnings: context.warnings,
      errors: context.errors,
      migrationApplied: context.migrationApplied,
      originalVersion: context.originalVersion
    };
  }

  static extractProjectMetadata(data: any): { projectData: any; metadata?: any } {
    return FileIOService.extractProjectData(data);
  }
}