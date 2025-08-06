/**
 * Cross-Module Actions - Entry Point
 * Re-exports the modularized cross-module actions for backward compatibility
 */

export type {
  CharacterDeletionPayload,
  ChapterReorderPayload,
  CharacterUpdatePayload,
} from './crossModule/types';

export {
  deleteCharacterWithCleanup,
  updateCharacterWithPropagation,
  reorderChaptersWithSync,
  validateStateIntegrity,
  executeAutomatedCleanup,
  validateAndCleanup,
  integrityActions,
} from './crossModule';

// For backward compatibility
export { integrityActions as default } from './crossModule';
