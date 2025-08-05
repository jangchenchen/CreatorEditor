/**
 * Import Validation Service
 * Handles validation of imported data
 */

import { OutlineData } from '../types/outline.types';
import { DataMigrationService } from '../dataMigrationService';

export class ImportValidationService {
  /**
   * Validate export data
   */
  static validateExportData(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data) {
      errors.push('No data to export');
    }

    if (!data.project) {
      errors.push('No project data found');
    }

    if (!data.version) {
      errors.push('No version information found');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate basic import data structure
   */
  static validateImportData(data: any): { isValid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!data) {
      errors.push('No data found in import file');
      return { isValid: false, errors, warnings };
    }

    if (!data.id) {
      errors.push('Project ID is required');
    }

    if (!data.projectName) {
      warnings.push('Project name is missing, will use default');
    }

    if (!data.version) {
      warnings.push('Version information missing, assuming legacy format');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Validate final imported data against current schema
   */
  static validateFinalImportData(data: OutlineData): { isValid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Use the migration service validation
    if (!DataMigrationService.validateCurrentSchema(data)) {
      errors.push('Data does not conform to current schema');
    }

    // Additional validations
    if (!data.characters || data.characters.length === 0) {
      warnings.push('No characters found in project');
    }

    if (!data.chapters || !data.chapters.chapters || data.chapters.chapters.length === 0) {
      warnings.push('No chapters found in project');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}