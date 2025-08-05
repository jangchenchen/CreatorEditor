/**
 * Cross-Module Action Types
 * Type definitions for cross-module operations
 */

import { Character } from '../../types/outline.types';

export interface CharacterDeletionPayload {
  characterId: string;
  cascade?: boolean;
}

export interface ChapterReorderPayload {
  newOrder: string[];
  updateSubplotReferences?: boolean;
}

export interface CharacterUpdatePayload {
  character: Character;
  propagateChanges?: boolean;
}

export interface CleanupExecutionContext {
  dispatch: any;
  getState: () => any;
}