import { ExportOptions, ExportProgress } from '../services/documentExportService';
import { OutlineData } from '../types/outline.types';

export interface DocumentExportState {
  isExporting: boolean;
  progress: ExportProgress | null;
  lastExportError: string | null;
}

export interface DocumentExportActions {
  exportDocument: (options: ExportOptions) => Promise<void>;
  exportToJSON: (options?: Partial<ExportOptions>) => Promise<void>;
  exportToWord: (options?: Partial<ExportOptions>) => Promise<void>;
  exportToPDF: (options?: Partial<ExportOptions>) => Promise<void>;
  clearError: () => void;
}

export interface DocumentExportUtils {
  getDefaultOptions: () => ExportOptions;
  validateExportData: () => { isValid: boolean; issues: string[] };
}

export interface UseDocumentExportResult
  extends DocumentExportState,
    DocumentExportActions,
    DocumentExportUtils {}
