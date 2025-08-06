/**
 * Export Helpers
 * Utility functions for export operations
 */

import { OutlineData } from '../types/outline.types';

export type ExportFormat = 'json' | 'json-pretty' | 'backup';

export interface ExportOptions {
  format: ExportFormat;
  includeMetadata: boolean;
  compression: boolean;
  encryption: boolean;
}

export class ExportHelpers {
  /**
   * Prepare export data with metadata
   */
  static prepareExportData(projectData: OutlineData, options: ExportOptions): any {
    const exportData: any = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      project: { ...projectData },
    };

    if (options.includeMetadata) {
      exportData.metadata = {
        exportFormat: options.format,
        exportedBy: 'Novel Creation Editor',
        exportOptions: options,
      };
    }

    return exportData;
  }

  /**
   * Generate export filename based on project name and format
   */
  static generateExportFilename(projectName: string, format: ExportFormat): string {
    const sanitizedProjectName = projectName.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_');
    const timestamp = new Date().toISOString().slice(0, 10);

    switch (format) {
      case 'json':
        return `${sanitizedProjectName}_${timestamp}.json`;
      case 'json-pretty':
        return `${sanitizedProjectName}_${timestamp}_pretty.json`;
      case 'backup':
        return `${sanitizedProjectName}_${timestamp}_backup.json`;
      default:
        return `${sanitizedProjectName}_${timestamp}.json`;
    }
  }

  /**
   * Format file size for display
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Create export summary
   */
  static createExportSummary(projectData: OutlineData): {
    characterCount: number;
    chapterCount: number;
    timelineEventCount: number;
    subplotCount: number;
    wordCount: number;
  } {
    const characterCount = projectData.characters?.length || 0;
    const chapterCount = projectData.chapters?.chapters?.length || 0;
    const timelineEventCount = projectData.timeline?.events?.length || 0;
    const subplotCount = projectData.subplots?.subplots?.length || 0;

    // Calculate approximate word count from chapter content
    let wordCount = 0;
    if (projectData.chapters?.chapters) {
      projectData.chapters.chapters.forEach(chapter => {
        if (chapter.content) {
          wordCount += chapter.content.split(/\s+/).length;
        }
      });
    }

    return {
      characterCount,
      chapterCount,
      timelineEventCount,
      subplotCount,
      wordCount,
    };
  }
}
