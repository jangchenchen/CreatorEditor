/**
 * Storage Initialization Index
 * Exports all storage initialization utilities
 */

export { initializeStorageSystem, shutdownStorageSystem } from './StorageInitializer';
export { loadLastProject, displayStartupMessages } from './StartupHelpers';
export { 
  getAvailableProjects, 
  switchProject, 
  deleteProject, 
  duplicateProject, 
  renameProject,
  getProjectMetadata 
} from './ProjectManager';
export { 
  createNewProject, 
  createDefaultProject, 
  createTemplateProject,
  generateProjectId,
  validateProjectName 
} from './ProjectFactory';
export { 
  createOutlineStateFromData, 
  createDataFromOutlineState, 
  normalizeProjectData,
  cloneProjectData,
  mergeProjectData 
} from './StateConverter';
export { recoveryUtils } from './RecoveryUtils';

// Re-export types
export type {
  InitializationResult,
  ProjectInfo,
  SwitchProjectResult,
  RecoveryResult,
  InitializationConfig
} from '../../types/storageInitializerTypes';
export { DEFAULT_INIT_CONFIG } from '../../types/storageInitializerTypes';