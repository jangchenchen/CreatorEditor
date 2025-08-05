/**
 * Import/Export Service
 * Main entry point for import/export operations
 * Delegates to specialized services for better modularity
 */

// Re-export types and interfaces
export type { ExportFormat, ExportOptions, ExportResult } from './importExport/ProjectExportService';
export type { ImportResult } from './importExport/ProjectImportService';
export type { BackupResult } from './importExport/BackupService';

// Re-export services
export { ProjectExportService } from './importExport/ProjectExportService';
export { ProjectImportService } from './importExport/ProjectImportService';
export { BackupService } from './importExport/BackupService';
export { FileIOService } from './importExport/FileIOService';
export { ImportValidationService } from './importExport/ImportValidationService';
export { ExportHelpers } from './importExport/ExportHelpers';

// Legacy compatibility - keep static methods for backward compatibility
import { ProjectExportService } from './importExport/ProjectExportService';
import { ProjectImportService } from './importExport/ProjectImportService';
import { BackupService } from './importExport/BackupService';

/**
 * @deprecated Use ProjectExportService.exportProject instead
 */
export const exportProject = ProjectExportService.exportProject.bind(ProjectExportService);

/**
 * @deprecated Use ProjectImportService.importProject instead
 */
export const importProject = ProjectImportService.importProject.bind(ProjectImportService);

/**
 * @deprecated Use BackupService.exportBackup instead
 */
export const exportBackup = BackupService.exportBackup.bind(BackupService);

/**
 * @deprecated Use BackupService.importBackup instead
 */
export const importBackup = BackupService.importBackup.bind(BackupService);

/**
 * @deprecated Use ProjectImportService.handleFileImport instead
 */
export const handleFileImport = ProjectImportService.handleFileImport.bind(ProjectImportService);