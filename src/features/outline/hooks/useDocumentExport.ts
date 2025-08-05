import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectOutlineData } from '../slices/rootOutlineSlice';
import { 
  DocumentExportService, 
  ExportOptions, 
  ExportProgress 
} from '../services/documentExportService';
import { OutlineData } from '../types/outline.types';

export interface UseDocumentExportResult {
  // Export state
  isExporting: boolean;
  progress: ExportProgress | null;
  lastExportError: string | null;
  
  // Export functions
  exportDocument: (options: ExportOptions) => Promise<void>;
  exportToJSON: (options?: Partial<ExportOptions>) => Promise<void>;
  exportToWord: (options?: Partial<ExportOptions>) => Promise<void>;
  exportToPDF: (options?: Partial<ExportOptions>) => Promise<void>;
  
  // Utility functions
  getDefaultOptions: () => ExportOptions;
  clearError: () => void;
  
  // Data validation
  validateExportData: () => { isValid: boolean; issues: string[] };
}

export const useDocumentExport = (): UseDocumentExportResult => {
  const outlineData = useSelector(selectOutlineData);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState<ExportProgress | null>(null);
  const [lastExportError, setLastExportError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setLastExportError(null);
  }, []);

  const handleProgress = useCallback((progressUpdate: ExportProgress) => {
    setProgress(progressUpdate);
    
    if (progressUpdate.stage === 'complete') {
      setIsExporting(false);
      setProgress(null);
    } else if (progressUpdate.stage === 'error') {
      setIsExporting(false);
      setLastExportError(progressUpdate.currentStep);
    }
  }, []);

  const exportDocument = useCallback(async (options: ExportOptions) => {
    if (!outlineData) {
      setLastExportError('没有可导出的数据');
      return;
    }

    if (isExporting) {
      setLastExportError('已有导出任务在进行中');
      return;
    }

    setIsExporting(true);
    setLastExportError(null);
    setProgress(null);

    try {
      await DocumentExportService.exportDocument(
        outlineData as OutlineData,
        options,
        handleProgress
      );
    } catch (error) {
      setIsExporting(false);
      setLastExportError(error instanceof Error ? error.message : '导出失败');
      setProgress(null);
    }
  }, [outlineData, isExporting, handleProgress]);

  const exportToJSON = useCallback(async (options: Partial<ExportOptions> = {}) => {
    const fullOptions: ExportOptions = {
      ...DocumentExportService.getDefaultExportOptions(),
      ...options,
      format: 'json',
    };
    await exportDocument(fullOptions);
  }, [exportDocument]);

  const exportToWord = useCallback(async (options: Partial<ExportOptions> = {}) => {
    const fullOptions: ExportOptions = {
      ...DocumentExportService.getDefaultExportOptions(),
      ...options,
      format: 'docx',
    };
    await exportDocument(fullOptions);
  }, [exportDocument]);

  const exportToPDF = useCallback(async (options: Partial<ExportOptions> = {}) => {
    const fullOptions: ExportOptions = {
      ...DocumentExportService.getDefaultExportOptions(),
      ...options,
      format: 'pdf',
    };
    await exportDocument(fullOptions);
  }, [exportDocument]);

  const getDefaultOptions = useCallback((): ExportOptions => {
    const defaultOptions = DocumentExportService.getDefaultExportOptions();
    
    // Auto-fill title and author from outline data if available
    if (outlineData) {
      defaultOptions.formatting.title = outlineData.projectName || '';
      // Could potentially extract author from story data if available
    }
    
    return defaultOptions;
  }, [outlineData]);

  const validateExportData = useCallback((): { isValid: boolean; issues: string[] } => {
    const issues: string[] = [];
    
    if (!outlineData) {
      issues.push('没有可导出的项目数据');
      return { isValid: false, issues };
    }

    // Check if there's any content to export
    let hasContent = false;
    
    if (outlineData.story && (
      outlineData.story.background?.era ||
      outlineData.story.coreTheme?.theme ||
      outlineData.story.synopsis?.beginning
    )) {
      hasContent = true;
    }

    if (outlineData.characters && outlineData.characters.length > 0) {
      hasContent = true;
    }

    if (outlineData.timeline && outlineData.timeline.events && outlineData.timeline.events.length > 0) {
      hasContent = true;
    }

    if (outlineData.chapters && outlineData.chapters.chapters && outlineData.chapters.chapters.length > 0) {
      hasContent = true;
    }

    if (outlineData.subplots && outlineData.subplots.subplots && outlineData.subplots.subplots.length > 0) {
      hasContent = true;
    }

    if (outlineData.ideas && outlineData.ideas.ideas && outlineData.ideas.ideas.length > 0) {
      hasContent = true;
    }

    if (!hasContent) {
      issues.push('项目中没有足够的内容可以导出');
    }

    // Check for potential data quality issues
    if (outlineData.characters) {
      const charactersWithoutNames = outlineData.characters.filter(c => !c.name || c.name.trim() === '');
      if (charactersWithoutNames.length > 0) {
        issues.push(`发现 ${charactersWithoutNames.length} 个角色没有名称`);
      }
    }

    if (outlineData.chapters && outlineData.chapters.chapters) {
      const chaptersWithoutTitles = outlineData.chapters.chapters.filter(c => !c.title || c.title.trim() === '');
      if (chaptersWithoutTitles.length > 0) {
        issues.push(`发现 ${chaptersWithoutTitles.length} 个章节没有标题`);
      }

      const chaptersWithoutSummary = outlineData.chapters.chapters.filter(c => !c.summary || c.summary.trim() === '');
      if (chaptersWithoutSummary.length > 0) {
        issues.push(`发现 ${chaptersWithoutSummary.length} 个章节没有概述`);
      }
    }

    if (outlineData.timeline && outlineData.timeline.events) {
      const eventsWithoutTitles = outlineData.timeline.events.filter(e => !e.title || e.title.trim() === '');
      if (eventsWithoutTitles.length > 0) {
        issues.push(`发现 ${eventsWithoutTitles.length} 个时间线事件没有标题`);
      }
    }

    return {
      isValid: issues.length === 0 || hasContent, // Allow export even with minor issues if there's content
      issues
    };
  }, [outlineData]);

  return {
    isExporting,
    progress,
    lastExportError,
    exportDocument,
    exportToJSON,
    exportToWord,
    exportToPDF,
    getDefaultOptions,
    clearError,
    validateExportData,
  };
};