import { useExportData } from './useExportData';
import { useExportState } from './useExportState';
import { useExportActions } from './useExportActions';
import { UseDocumentExportResult } from './exportTypes';

export const useDocumentExportNew = (): UseDocumentExportResult => {
  const { outlineData, getDefaultOptions, validateExportData } = useExportData();
  const { isExporting, progress, lastExportError, clearError, startExport } = useExportState();
  const { exportDocument, exportToJSON, exportToWord, exportToPDF } = useExportActions(startExport, outlineData);

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
    validateExportData
  };
};