/**
 * Cross-Module Actions Entry Point
 * Exports all cross-module action modules
 */

// Types
export type {
  CharacterDeletionPayload,
  ChapterReorderPayload,
  CharacterUpdatePayload,
  CleanupExecutionContext,
} from './types';

// Character Actions
export { deleteCharacterWithCleanup, updateCharacterWithPropagation } from './characterActions';

// Chapter Actions
export { reorderChaptersWithSync } from './chapterActions';

// Validation Actions
export {
  validateStateIntegrity,
  executeAutomatedCleanup,
  validateAndCleanup,
} from './validationActions';

// Cleanup Utilities
export { generateCharacterCleanupActions } from './cleanupGenerators';
export { executeCleanupAction } from './cleanupExecutors';

// Simplified action creators for convenience
export const integrityActions = {
  deleteCharacterSafely: deleteCharacterWithCleanup,
  updateCharacterWithSync: updateCharacterWithPropagation,
  reorderChaptersWithSync,
  validateState: validateStateIntegrity,
  runCleanup: executeAutomatedCleanup,
  validateAndCleanup,
};
