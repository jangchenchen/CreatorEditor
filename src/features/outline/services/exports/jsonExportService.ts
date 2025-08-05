import { saveAs } from 'file-saver';
import { OutlineData } from '../../types/outline.types';
import { ExportOptions, ExportService, UpdateProgressFunction } from '../../types/exportTypes';
import { BaseExportService } from './baseExportService';

export class JsonExportService implements ExportService {
  /**
   * Export to JSON format
   */
  async export(
    data: OutlineData,
    options: ExportOptions,
    updateProgress: UpdateProgressFunction
  ): Promise<void> {
    updateProgress('processing', 25, '整理数据结构', 1, 4);
    
    const exportData = BaseExportService.filterDataByModules(data, options.includeModules);
    
    updateProgress('generating', 50, '生成JSON文件', 2, 4);
    
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    updateProgress('saving', 75, '保存文件', 3, 4);
    
    const filename = BaseExportService.generateFilename(options, data, 'json');
    saveAs(blob, filename);
  }
}