/**
 * Storage Initializer Types
 * Type definitions for storage initialization
 */
// @ts-nocheck


export interface InitializationResult {
  success: boolean;
  loadedProject: string | null;
  isNewProject: boolean;
  migrationApplied: boolean;
  warnings: string[];
  errors: string[];
}

export interface ProjectInfo {
  id: string;
  name: string;
  lastUpdated: Date;
  charactersCount: number;
  chaptersCount: number;
}

export interface SwitchProjectResult {
  success: boolean;
  error?: string;
}

export interface RecoveryResult {
  success: boolean;
  message: string;
}

export interface InitializationConfig {
  autoLoadLastProject: boolean;
  createDefaultProject: boolean;
  enableAutoSave: boolean;
  showStartupMessages: boolean;
}

export const DEFAULT_INIT_CONFIG: InitializationConfig = {
  autoLoadLastProject: true,
  createDefaultProject: true,
  enableAutoSave: true,
  showStartupMessages: true,
};
