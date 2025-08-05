/**
 * 存储Hook类型定义
 */

import { ImportResult, ExportResult } from '../../services/importExportService';
import { OutlineData } from '../../types/outline.types';

export interface UseLocalStorageReturn {
  // Storage status
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Auto-save status
  autoSave: {
    enabled: boolean;
    saving: boolean;
    lastSaveTime: number;
    hasPendingChanges: boolean;
  };
  
  // Storage operations
  saveProject: () => Promise<void>;
  loadProject: (projectId?: string) => Promise<OutlineData | null>;
  deleteProject: (projectId: string) => Promise<void>;
  getProjectList: () => Promise<Array<{ id: string; name: string; lastUpdated: Date }>>;
  
  // Auto-save controls
  enableAutoSave: () => void;
  disableAutoSave: () => void;
  forceSave: () => Promise<void>;
  
  // Import/Export operations
  exportProject: (projectId: string, filePath: string) => Promise<ExportResult>;
  importProject: (file: File) => Promise<ImportResult>;
  exportBackup: (filePath: string) => Promise<ExportResult>;
  
  // Storage statistics
  getStorageStats: () => Promise<any>;
  
  // Utility functions
  clearError: () => void;
}