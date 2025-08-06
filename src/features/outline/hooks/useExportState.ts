import { useState, useCallback } from 'react';
import { ExportOptions, ExportProgress } from '../services/documentExportService';
import { OutlineData } from '../types/outline.types';

export const useExportState = () => {
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

  const startExport = useCallback(
    async (
      outlineData: OutlineData,
      options: ExportOptions,
      exportFunction: (
        data: OutlineData,
        options: ExportOptions,
        onProgress: (progress: ExportProgress) => void
      ) => Promise<void>
    ) => {
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
        await exportFunction(outlineData, options, handleProgress);
      } catch (error) {
        setIsExporting(false);
        setLastExportError(error instanceof Error ? error.message : '导出失败');
        setProgress(null);
      }
    },
    [isExporting, handleProgress]
  );

  return {
    isExporting,
    progress,
    lastExportError,
    clearError,
    startExport,
  };
};
