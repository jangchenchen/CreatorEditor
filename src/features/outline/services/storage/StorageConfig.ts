/**
 * Storage Configuration
 * Centralized configuration for localStorage service
 */

export const STORAGE_CONFIG = {
  fileName: 'novel-editor-data.json',
  backupFileName: 'novel-editor-data.backup.json',
  currentVersion: '1.0.0',
  autoSaveInterval: 5000, // 5 seconds
  maxBackups: 5,
} as const;

// Database schema
export interface DatabaseSchema {
  version: string;
  projects: Record<string, any>;
  activeProject: string | null;
  settings: {
    autoSave: boolean;
    backupEnabled: boolean;
    lastBackup: string | null;
  };
  metadata: {
    created: string;
    lastModified: string;
    totalProjects: number;
  };
}

// Default database data
export const defaultData: DatabaseSchema = {
  version: STORAGE_CONFIG.currentVersion,
  projects: {},
  activeProject: null,
  settings: {
    autoSave: true,
    backupEnabled: true,
    lastBackup: null,
  },
  metadata: {
    created: new Date().toISOString(),
    lastModified: new Date().toISOString(),
    totalProjects: 0,
  },
};
