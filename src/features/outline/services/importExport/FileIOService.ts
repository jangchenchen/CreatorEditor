/**
 * File I/O Service
 * Handles file read/write operations for import/export
 */

export type ExportFormat = 'json' | 'json-pretty' | 'backup';

export interface ExportOptions {
  format: ExportFormat;
  includeMetadata: boolean;
  compression: boolean;
  encryption: boolean;
}

export class FileIOService {
  /**
   * Write export data to file
   */
  static async writeExportFile(filePath: string, data: any, options: ExportOptions): Promise<void> {
    let content: string;

    switch (options.format) {
      case 'json':
        content = JSON.stringify(data);
        break;
      case 'json-pretty':
        content = JSON.stringify(data, null, 2);
        break;
      case 'backup':
        content = JSON.stringify(data, null, 2);
        break;
      default:
        content = JSON.stringify(data, null, 2);
    }

    // For now, use a simple file write approach
    // In a real Electron app, you would use fs.writeFileSync or dialog.showSaveDialog
    if (typeof window !== 'undefined' && (window as any).electronAPI) {
      await (window as any).electronAPI.writeFile(filePath, content);
    } else {
      // Development fallback - create blob and trigger download
      const blob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filePath.split('/').pop() || 'export.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  /**
   * Read import file
   */
  static async readImportFile(filePath: string): Promise<any> {
    let content: string;

    if (typeof window !== 'undefined' && (window as any).electronAPI) {
      content = await (window as any).electronAPI.readFile(filePath);
    } else {
      // Development fallback - this would be handled by file input
      throw new Error('File reading not implemented for web version');
    }

    try {
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to parse JSON: ${error.message}`);
    }
  }

  /**
   * Get file size
   */
  static async getFileSize(filePath: string): Promise<number> {
    if (typeof window !== 'undefined' && (window as any).electronAPI) {
      return await (window as any).electronAPI.getFileSize(filePath);
    }
    return 0; // Fallback for web
  }

  /**
   * Extract project data from file data
   */
  static extractProjectData(fileData: any): { projectData: any; metadata?: any } {
    if (fileData.project) {
      // Standard export format
      return {
        projectData: fileData.project,
        metadata: fileData.metadata,
      };
    } else if (fileData.id && fileData.projectName) {
      // Direct project data
      return {
        projectData: fileData,
      };
    } else {
      throw new Error('Invalid file format: cannot extract project data');
    }
  }
}
