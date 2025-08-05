import { OutlineData } from '../../types/outline.types';
import { ExportOptions, ExportProgress, ExportProgressCallback, UpdateProgressFunction } from '../../types/exportTypes';
import { JsonExportService } from './jsonExportService';
import { WordExportService } from './wordExportService';
import { PdfExportService } from './pdfExportService';
import { BaseExportService } from './baseExportService';

export class CoordinatorExportService {
  private static jsonService = new JsonExportService();
  private static wordService = new WordExportService();
  private static pdfService = new PdfExportService();

  /**
   * Main export orchestrator - routes to appropriate service based on format
   */
  static async exportDocument(
    data: OutlineData,
    options: ExportOptions,
    onProgress?: ExportProgressCallback
  ): Promise<void> {
    const updateProgress = (
      stage: ExportProgress['stage'], 
      progress: number, 
      currentStep: string, 
      currentStepIndex: number, 
      totalSteps: number
    ) => {
      if (onProgress) {
        onProgress({ stage, progress, currentStep, currentStepIndex, totalSteps });
      }
    };

    try {
      updateProgress('preparing', 0, '准备导出数据', 0, 4);
      
      switch (options.format) {
        case 'json':
          await this.jsonService.export(data, options, updateProgress);
          break;
        case 'docx':
          await this.wordService.export(data, options, updateProgress);
          break;
        case 'pdf':
          await this.pdfService.export(data, options, updateProgress);
          break;
        default:
          throw new Error(`Unsupported export format: ${options.format}`);
      }
      
      updateProgress('complete', 100, '导出完成', 4, 4);
    } catch (error) {
      updateProgress('error', 0, `导出失败: ${error.message}`, 0, 4);
      throw error;
    }
  }

  /**
   * Get default export options
   */
  static getDefaultExportOptions(): ExportOptions {
    return BaseExportService.getDefaultExportOptions();
  }

  /**
   * Validate export options
   */
  static validateExportOptions(options: ExportOptions): boolean {
    if (!options.format || !['json', 'docx', 'pdf'].includes(options.format)) {
      return false;
    }
    
    if (!options.includeModules || typeof options.includeModules !== 'object') {
      return false;
    }
    
    if (!options.formatting || typeof options.formatting !== 'object') {
      return false;
    }
    
    return true;
  }

  /**
   * Get supported export formats
   */
  static getSupportedFormats(): Array<{ value: string; label: string }> {
    return [
      { value: 'json', label: 'JSON 数据格式' },
      { value: 'docx', label: 'Word 文档' },
      { value: 'pdf', label: 'PDF 文档' }
    ];
  }
}