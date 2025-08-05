import { useState, useCallback, useEffect } from 'react';
import { ExportOptions } from '../services/documentExportService';
import { useDocumentExport } from './useDocumentExport';

export interface ExportDialogState {
  exportOptions: ExportOptions;
  activeStep: number;
  validationResult: { isValid: boolean; issues: string[] } | null;
}

export const useExportDialogState = (defaultFormat: 'json' | 'docx' | 'pdf' = 'docx') => {
  const {
    isExporting,
    progress,
    lastExportError,
    exportDocument,
    getDefaultOptions,
    clearError,
    validateExportData
  } = useDocumentExport();

  const [state, setState] = useState<ExportDialogState>(() => ({
    exportOptions: {
      ...getDefaultOptions(),
      format: defaultFormat
    },
    activeStep: 0,
    validationResult: null
  }));

  const resetState = useCallback(() => {
    setState({
      exportOptions: {
        ...getDefaultOptions(),
        format: defaultFormat
      },
      activeStep: 0,
      validationResult: validateExportData()
    });
    clearError();
  }, [defaultFormat, getDefaultOptions, clearError, validateExportData]);

  const handleFormatChange = useCallback((format: 'json' | 'docx' | 'pdf') => {
    setState(prev => ({
      ...prev,
      exportOptions: {
        ...prev.exportOptions,
        format
      }
    }));
  }, []);

  const handleModuleToggle = useCallback((module: keyof ExportOptions['includeModules']) => {
    setState(prev => ({
      ...prev,
      exportOptions: {
        ...prev.exportOptions,
        includeModules: {
          ...prev.exportOptions.includeModules,
          [module]: !prev.exportOptions.includeModules[module]
        }
      }
    }));
  }, []);

  const handleFormattingChange = useCallback((field: keyof ExportOptions['formatting'], value: any) => {
    setState(prev => ({
      ...prev,
      exportOptions: {
        ...prev.exportOptions,
        formatting: {
          ...prev.exportOptions.formatting,
          [field]: value
        }
      }
    }));
  }, []);

  const handleNext = useCallback(() => {
    if (state.activeStep === 0) {
      const validation = validateExportData();
      setState(prev => ({
        ...prev,
        validationResult: validation
      }));
      if (!validation.isValid) {
        return;
      }
    }
    setState(prev => ({
      ...prev,
      activeStep: prev.activeStep + 1
    }));
  }, [state.activeStep, validateExportData]);

  const handleBack = useCallback(() => {
    setState(prev => ({
      ...prev,
      activeStep: prev.activeStep - 1
    }));
  }, []);

  const handleExport = useCallback(async () => {
    try {
      await exportDocument(state.exportOptions);
    } catch (error) {
      // Error handling is done in the hook
    }
  }, [exportDocument, state.exportOptions]);

  const canProceed = useCallback(() => {
    if (state.activeStep === 0) {
      return state.validationResult?.isValid ?? false;
    }
    if (state.activeStep === 1) {
      return Object.values(state.exportOptions.includeModules).some(Boolean);
    }
    return true;
  }, [state]);

  return {
    state,
    setState,
    resetState,
    handleFormatChange,
    handleModuleToggle,
    handleFormattingChange,
    handleNext,
    handleBack,
    handleExport,
    canProceed,
    isExporting,
    progress,
    lastExportError
  };
};