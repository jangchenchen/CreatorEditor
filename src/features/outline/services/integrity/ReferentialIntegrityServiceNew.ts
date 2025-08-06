import { OutlineState } from '../../types/outline.types';
import {
  ValidationResult,
  ValidationError,
  ValidationWarning,
  CleanupAction,
} from './integrityTypes';
import { TimelineValidator } from './validators/TimelineValidator';
import { ChapterValidator } from './validators/ChapterValidator';
import { SubplotValidator } from './validators/SubplotValidator';
import { SecondaryStoryValidator } from './validators/SecondaryStoryValidator';
import { IdeaValidator } from './validators/IdeaValidator';
import { CharacterUsageValidator } from './validators/CharacterUsageValidator';
import { CleanupActionGenerator } from './cleanup/CleanupActionGenerator';
import { ReduxActionGenerator } from './cleanup/ReduxActionGenerator';

export class ReferentialIntegrityServiceNew {
  /**
   * Validates all cross-module references in the outline state
   */
  static validateState(state: OutlineState): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    const validCharacterIds = new Set(state.characters.characters.map(c => c.id));
    const validChapterNumbers = new Set(state.chapters.chapters.map(c => c.number));
    const validChapterIds = new Set(state.chapters.chapters.map(c => c.id));

    // Run all validators
    TimelineValidator.validateTimelineEvents(
      state.timeline.events,
      validCharacterIds,
      errors,
      warnings
    );
    ChapterValidator.validateChapterScenes(
      state.chapters.chapters,
      validCharacterIds,
      errors,
      warnings
    );
    SubplotValidator.validateSubplots(
      state.subplots.subplots,
      validCharacterIds,
      validChapterNumbers,
      errors,
      warnings
    );
    SecondaryStoryValidator.validateSecondaryStories(
      state.subplots.secondaryStories,
      validCharacterIds,
      errors,
      warnings
    );
    IdeaValidator.validateIdeas(
      state.ideas.ideas,
      validCharacterIds,
      validChapterIds,
      errors,
      warnings
    );
    CharacterUsageValidator.checkUnusedCharacters(state, validCharacterIds, warnings);

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Generates cleanup actions to fix referential integrity issues
   */
  static generateCleanupActions(state: OutlineState): CleanupAction[] {
    const actions: CleanupAction[] = [];
    const validationResult = this.validateState(state);

    // Generate cleanup actions based on validation errors
    validationResult.errors.forEach(error => {
      const cleanupAction = CleanupActionGenerator.generateCleanupActionForError(error);
      if (cleanupAction) {
        actions.push(cleanupAction);
      }
    });

    return actions;
  }

  /**
   * Creates Redux actions for executing cleanup operations
   */
  static createCleanupActions() {
    return ReduxActionGenerator.createCleanupActions();
  }
}
