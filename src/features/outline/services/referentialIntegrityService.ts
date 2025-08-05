import { createAction } from '@reduxjs/toolkit';
import {
  Character,
  Chapter,
  TimelineEvent,
  Subplot,
  SecondaryStory,
  Idea,
  OutlineState
} from '../types/outline.types';

// Define validation result types
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  type: 'orphaned_reference' | 'invalid_chapter_range' | 'missing_required_field';
  module: string;
  entityId: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
}

export interface ValidationWarning {
  type: 'unused_character' | 'empty_scene' | 'potential_inconsistency';
  module: string;
  entityId?: string;
  message: string;
}

// Define cleanup action types
export interface CleanupAction {
  type: 'remove_reference' | 'update_field' | 'delete_entity';
  module: string;
  entityId: string;
  field?: string;
  oldValue?: any;
  newValue?: any;
  description: string;
}

export class ReferentialIntegrityService {
  
  /**
   * Validates all cross-module references in the outline state
   */
  static validateState(state: OutlineState): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    
    const validCharacterIds = new Set(state.characters.characters.map(c => c.id));
    const validChapterNumbers = new Set(state.chapters.chapters.map(c => c.number));
    const validChapterIds = new Set(state.chapters.chapters.map(c => c.id));
    
    // Validate timeline events
    this.validateTimelineEvents(state.timeline.events, validCharacterIds, errors, warnings);
    
    // Validate chapter scenes
    this.validateChapterScenes(state.chapters.chapters, validCharacterIds, errors, warnings);
    
    // Validate subplots
    this.validateSubplots(state.subplots.subplots, validCharacterIds, validChapterNumbers, errors, warnings);
    
    // Validate secondary stories
    this.validateSecondaryStories(state.subplots.secondaryStories, validCharacterIds, errors, warnings);
    
    // Validate ideas
    this.validateIdeas(state.ideas.ideas, validCharacterIds, validChapterIds, errors, warnings);
    
    // Check for unused characters
    this.checkUnusedCharacters(state, validCharacterIds, warnings);
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
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
      const cleanupAction = this.generateCleanupActionForError(error);
      if (cleanupAction) {
        actions.push(cleanupAction);
      }
    });
    
    return actions;
  }
  
  /**
   * Validates character references in timeline events
   */
  private static validateTimelineEvents(
    events: TimelineEvent[],
    validCharacterIds: Set<string>,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ) {
    events.forEach(event => {
      const orphanedCharacters = event.characters.filter(charId => !validCharacterIds.has(charId));
      
      orphanedCharacters.forEach(charId => {
        errors.push({
          type: 'orphaned_reference',
          module: 'timeline',
          entityId: event.id,
          message: `Timeline event "${event.title}" references deleted character: ${charId}`,
          severity: 'medium'
        });
      });
      
      // Check for empty events
      if (!event.title.trim()) {
        warnings.push({
          type: 'potential_inconsistency',
          module: 'timeline',
          entityId: event.id,
          message: `Timeline event has empty title`
        });
      }
    });
  }
  
  /**
   * Validates character references in chapter scenes
   */
  private static validateChapterScenes(
    chapters: Chapter[],
    validCharacterIds: Set<string>,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ) {
    chapters.forEach(chapter => {
      chapter.keyScenes.forEach(scene => {
        const orphanedCharacters = scene.characters.filter(charId => !validCharacterIds.has(charId));
        
        orphanedCharacters.forEach(charId => {
          errors.push({
            type: 'orphaned_reference',
            module: 'chapters',
            entityId: scene.id,
            message: `Scene "${scene.title}" in Chapter ${chapter.number} references deleted character: ${charId}`,
            severity: 'high'
          });
        });
        
        // Check for empty scenes
        if (!scene.title.trim() || !scene.description.trim()) {
          warnings.push({
            type: 'empty_scene',
            module: 'chapters',
            entityId: scene.id,
            message: `Scene in Chapter ${chapter.number} is missing title or description`
          });
        }
      });
    });
  }
  
  /**
   * Validates subplot references
   */
  private static validateSubplots(
    subplots: Subplot[],
    validCharacterIds: Set<string>,
    validChapterNumbers: Set<string | number>,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ) {
    subplots.forEach(subplot => {
      // Check character references
      const orphanedCharacters = subplot.relatedCharacters.filter(charId => !validCharacterIds.has(charId));
      orphanedCharacters.forEach(charId => {
        errors.push({
          type: 'orphaned_reference',
          module: 'subplots',
          entityId: subplot.id,
          message: `Subplot "${subplot.title}" references deleted character: ${charId}`,
          severity: 'medium'
        });
      });
      
      // Check chapter range validity
      if (subplot.startChapter && !validChapterNumbers.has(subplot.startChapter)) {
        errors.push({
          type: 'invalid_chapter_range',
          module: 'subplots',
          entityId: subplot.id,
          message: `Subplot "${subplot.title}" has invalid start chapter: ${subplot.startChapter}`,
          severity: 'high'
        });
      }
      
      if (subplot.endChapter && !validChapterNumbers.has(subplot.endChapter)) {
        errors.push({
          type: 'invalid_chapter_range',
          module: 'subplots',
          entityId: subplot.id,
          message: `Subplot "${subplot.title}" has invalid end chapter: ${subplot.endChapter}`,
          severity: 'high'
        });
      }
      
      // Check for logical chapter range
      if (subplot.startChapter && subplot.endChapter && 
          Number(subplot.startChapter) > Number(subplot.endChapter)) {
        warnings.push({
          type: 'potential_inconsistency',
          module: 'subplots',
          entityId: subplot.id,
          message: `Subplot "${subplot.title}" has start chapter after end chapter`
        });
      }
    });
  }
  
  /**
   * Validates secondary character stories
   */
  private static validateSecondaryStories(
    stories: SecondaryStory[],
    validCharacterIds: Set<string>,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ) {
    stories.forEach(story => {
      if (!validCharacterIds.has(story.characterId)) {
        errors.push({
          type: 'orphaned_reference',
          module: 'secondary_stories',
          entityId: story.id,
          message: `Secondary story "${story.title}" references deleted character: ${story.characterId}`,
          severity: 'high'
        });
      }
      
      // Check for story completeness
      if (!story.title.trim() || !story.description.trim()) {
        warnings.push({
          type: 'potential_inconsistency',
          module: 'secondary_stories',
          entityId: story.id,
          message: `Secondary story is missing title or description`
        });
      }
    });
  }
  
  /**
   * Validates idea references
   */
  private static validateIdeas(
    ideas: Idea[],
    validCharacterIds: Set<string>,
    validChapterIds: Set<string>,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ) {
    ideas.forEach(idea => {
      idea.relatedElements.forEach(element => {
        if (element.type === 'character' && !validCharacterIds.has(element.id)) {
          errors.push({
            type: 'orphaned_reference',
            module: 'ideas',
            entityId: idea.id,
            message: `Idea "${idea.title}" references deleted character: ${element.id}`,
            severity: 'low'
          });
        }
        
        if (element.type === 'chapter' && !validChapterIds.has(element.id)) {
          errors.push({
            type: 'orphaned_reference',
            module: 'ideas',
            entityId: idea.id,
            message: `Idea "${idea.title}" references deleted chapter: ${element.id}`,
            severity: 'low'
          });
        }
      });
    });
  }
  
  /**
   * Checks for unused characters across the system
   */
  private static checkUnusedCharacters(
    state: OutlineState,
    validCharacterIds: Set<string>,
    warnings: ValidationWarning[]
  ) {
    const usedCharacterIds = new Set<string>();
    
    // Collect used character IDs from all modules
    state.timeline.events.forEach(event => {
      event.characters.forEach(charId => usedCharacterIds.add(charId));
    });
    
    state.chapters.chapters.forEach(chapter => {
      chapter.keyScenes.forEach(scene => {
        scene.characters.forEach(charId => usedCharacterIds.add(charId));
      });
    });
    
    state.subplots.subplots.forEach(subplot => {
      subplot.relatedCharacters.forEach(charId => usedCharacterIds.add(charId));
    });
    
    state.subplots.secondaryStories.forEach(story => {
      usedCharacterIds.add(story.characterId);
    });
    
    // Find unused characters
    validCharacterIds.forEach(charId => {
      if (!usedCharacterIds.has(charId)) {
        const character = state.characters.characters.find(c => c.id === charId);
        warnings.push({
          type: 'unused_character',
          module: 'characters',
          entityId: charId,
          message: `Character "${character?.name || charId}" is not used in any timeline events, scenes, or subplots`
        });
      }
    });
  }
  
  /**
   * Generates a cleanup action for a specific validation error
   */
  private static generateCleanupActionForError(error: ValidationError): CleanupAction | null {
    switch (error.type) {
      case 'orphaned_reference':
        return {
          type: 'remove_reference',
          module: error.module,
          entityId: error.entityId,
          field: 'characters', // This could be made more specific
          description: `Remove orphaned character reference from ${error.module}`
        };
        
      case 'invalid_chapter_range':
        return {
          type: 'update_field',
          module: error.module,
          entityId: error.entityId,
          field: error.message.includes('start') ? 'startChapter' : 'endChapter',
          newValue: null,
          description: `Clear invalid chapter reference`
        };
        
      default:
        return null;
    }
  }
  
  /**
   * Creates Redux actions for executing cleanup operations
   */
  static createCleanupActions() {
    return {
      executeCleanup: createAction<CleanupAction[]>('integrity/executeCleanup'),
      validateState: createAction('integrity/validateState'),
      generateReport: createAction('integrity/generateReport')
    };
  }
}

// Export utility functions for easy access
export const validateOutlineState = ReferentialIntegrityService.validateState;
export const generateCleanupActions = ReferentialIntegrityService.generateCleanupActions;