/**
 * Storage Controls Types
 * Type definitions for storage controls
 */

export interface StorageControlsState {
  showSettings: boolean;
  showStats: boolean;
  showImportDialog: boolean;
  showExportDialog: boolean;
  exportPath: string;
  storageStats: any;
  snackbar: {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  };
}

export interface StorageControlsHandlers {
  handleSave: () => Promise<void>;
  handleForceSave: () => Promise<void>;
  handleImportClick: () => void;
  handleFileSelected: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleExport: () => Promise<void>;
  handleBackupExport: () => Promise<void>;
  handleShowStats: () => Promise<void>;
  handleAutoSaveToggle: (enabled: boolean) => void;
  showSnackbar: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void;
  closeSnackbar: () => void;
  setShowSettings: (show: boolean) => void;
  setShowStats: (show: boolean) => void;
  setShowImportDialog: (show: boolean) => void;
  setShowExportDialog: (show: boolean) => void;
  setExportPath: (path: string) => void;
}

export type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';
