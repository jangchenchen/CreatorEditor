/**
 * Backup Service
 * Handles importing and exporting multiple projects as backup
 */

import { localStorageService } from '../localStorageService';
import { FileIOService } from './importExport/FileIOService';
import { ProjectImportService } from './importExport/ProjectImportService';
import { ExportResult } from './ProjectExportService';

export interface BackupResult {
  success: boolean;
  importedProjects: string[];
  skippedProjects: string[];
  errors: string[];
  warnings: string[];
}

export class BackupService {
  /**
   * Export multiple projects as backup
   */
  static async exportBackup(filePath: string): Promise<ExportResult> {
    try {
      const allProjects = await localStorageService.getProjectList();
      const backupData = {
        version: '1.0.0',
        createdAt: new Date().toISOString(),
        projectCount: allProjects.length,
        projects: {}
      };

      // Load all projects
      for (const projectInfo of allProjects) {
        const projectData = await localStorageService.loadProject(projectInfo.id);
        if (projectData) {
          backupData.projects[projectInfo.id] = projectData;
        }
      }

      // Write backup file
      await FileIOService.writeExportFile(filePath, backupData, { 
        format: 'json-pretty',
        includeMetadata: true,
        compression: false,
        encryption: false
      });

      const fileSize = await FileIOService.getFileSize(filePath);

      return {
        success: true,
        filePath,
        size: fileSize,
        errors: []
      };

    } catch (error) {
      return {
        success: false,
        errors: [`Backup export failed: ${error.message}`]
      };
    }
  }

  /**
   * Import backup file containing multiple projects
   */
  static async importBackup(filePath: string): Promise<BackupResult> {
    const importedProjects: string[] = [];
    const skippedProjects: string[] = [];
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const backupData = await FileIOService.readImportFile(filePath);
      
      if (!backupData || !backupData.projects) {
        return {
          success: false,
          importedProjects,
          skippedProjects,
          errors: ['Invalid backup file format'],
          warnings
        };
      }

      // Import each project
      for (const [projectId, projectData] of Object.entries(backupData.projects)) {
        try {
          // Use ProjectImportService to import each project
          const importResult = await ProjectImportService.importProjectData(projectData);
          
          if (importResult.success && importResult.project) {
            importedProjects.push(importResult.project.projectName);
            warnings.push(...importResult.warnings);
          } else {
            skippedProjects.push(projectId);
            errors.push(...importResult.errors);
          }
        } catch (error) {
          skippedProjects.push(projectId);
          errors.push(`Failed to import project ${projectId}: ${error.message}`);
        }
      }

      return {
        success: importedProjects.length > 0,
        importedProjects,
        skippedProjects,
        errors,
        warnings
      };

    } catch (error) {
      return {
        success: false,
        importedProjects,
        skippedProjects,
        errors: [`Backup import failed: ${error.message}`],
        warnings
      };
    }
  }
}