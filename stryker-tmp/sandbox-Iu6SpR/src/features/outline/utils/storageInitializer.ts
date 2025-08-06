/**
 * Storage Initializer Utility
 * Handles application startup, data loading, and storage initialization
 *
 * @deprecated This file has been refactored into modular components.
 * Use imports from './initialization/' for new development.
 * This file maintains backward compatibility.
 */
// @ts-nocheck


// Re-export all functions from the new modular structure
export {
  initializeStorageSystem,
  shutdownStorageSystem,
  getAvailableProjects,
  switchProject,
  deleteProject,
  duplicateProject,
  renameProject,
  getProjectMetadata,
  createNewProject,
  createDefaultProject,
  createTemplateProject,
  generateProjectId,
  validateProjectName,
  createOutlineStateFromData,
  createDataFromOutlineState,
  normalizeProjectData,
  cloneProjectData,
  mergeProjectData,
  recoveryUtils,
  DEFAULT_INIT_CONFIG,
} from './initialization';

// Re-export types
export type {
  InitializationResult,
  ProjectInfo,
  SwitchProjectResult,
  RecoveryResult,
  InitializationConfig,
} from './initialization';

// Default export for backward compatibility
export default {
  initializeStorageSystem,
  shutdownStorageSystem,
  getAvailableProjects,
  switchProject,
  createNewProject,
  recoveryUtils,
};
