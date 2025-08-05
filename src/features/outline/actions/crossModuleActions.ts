import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../../app/store';
import {
  deleteCharacter,
  updateCharacter,
  updateTimeline,
  updateChapter,
  updateSubplot,
  deleteSecondaryStory,
  updateIdea,
  reorderChapters
} from '../slices/rootOutlineSlice';
import { 
  ReferentialIntegrityService, 
  CleanupAction,
  ValidationResult 
} from '../services/referentialIntegrityService';
import { Character, Chapter } from '../types/outline.types';

// Cross-module action types
interface CharacterDeletionPayload {
  characterId: string;
  cascade?: boolean;
}

interface ChapterReorderPayload {
  newOrder: string[];
  updateSubplotReferences?: boolean;
}

interface CharacterUpdatePayload {
  character: Character;
  propagateChanges?: boolean;
}

/**
 * Safely delete a character with cascade cleanup across all modules
 */
export const deleteCharacterWithCleanup = createAsyncThunk<
  void,
  CharacterDeletionPayload,
  { dispatch: AppDispatch; state: RootState }
>(
  'crossModule/deleteCharacterWithCleanup',
  async ({ characterId, cascade = true }, { dispatch, getState }) => {
    const state = getState().outline;
    
    if (cascade) {
      // First, clean up all references to this character
      const cleanupActions = await generateCharacterCleanupActions(characterId, state);
      
      // Execute cleanup actions
      for (const action of cleanupActions) {
        await executeCleanupAction(action, dispatch, getState);
      }
    }
    
    // Finally, delete the character
    dispatch(deleteCharacter(characterId));
    
    // Validate state after deletion
    const newState = getState().outline;
    const validationResult = ReferentialIntegrityService.validateState(newState);
    
    if (!validationResult.isValid) {
      console.warn('Data integrity issues after character deletion:', validationResult.errors);
    }
  }
);

/**
 * Update character with propagation to related modules
 */
export const updateCharacterWithPropagation = createAsyncThunk<
  void,
  CharacterUpdatePayload,
  { dispatch: AppDispatch; state: RootState }
>(
  'crossModule/updateCharacterWithPropagation',
  async ({ character, propagateChanges = true }, { dispatch, getState }) => {
    // Update the character first
    dispatch(updateCharacter(character));
    
    if (propagateChanges) {
      // Currently, character updates typically don't require cascading changes
      // since references use IDs, but we could add validation or cache invalidation here
      
      // Validate state after update
      const newState = getState().outline;
      const validationResult = ReferentialIntegrityService.validateState(newState);
      
      if (!validationResult.isValid) {
        console.warn('Data integrity issues after character update:', validationResult.errors);
      }
    }
  }
);

/**
 * Reorder chapters with automatic subplot reference updates
 */
export const reorderChaptersWithSync = createAsyncThunk<
  void,
  ChapterReorderPayload,
  { dispatch: AppDispatch; state: RootState }
>(
  'crossModule/reorderChaptersWithSync',
  async ({ newOrder, updateSubplotReferences = true }, { dispatch, getState }) => {
    const state = getState().outline;
    const currentChapters = state.chapters.chapters;
    
    // Create mapping of old to new chapter numbers
    const chapterMapping: Record<number, number> = {};
    newOrder.forEach((chapterId, newIndex) => {
      const chapter = currentChapters.find(c => c.id === chapterId);
      if (chapter) {
        chapterMapping[chapter.number] = newIndex + 1;
      }
    });
    
    // Reorder chapters
    dispatch(reorderChapters(newOrder));
    
    if (updateSubplotReferences) {
      // Update subplot chapter references
      const updatedSubplots = state.subplots.subplots.map(subplot => {
        const updatedSubplot = { ...subplot };
        
        if (subplot.startChapter && chapterMapping[subplot.startChapter]) {
          updatedSubplot.startChapter = chapterMapping[subplot.startChapter];
        }
        
        if (subplot.endChapter && chapterMapping[subplot.endChapter]) {
          updatedSubplot.endChapter = chapterMapping[subplot.endChapter];
        }
        
        return updatedSubplot;
      });
      
      // Dispatch updates for modified subplots
      updatedSubplots.forEach(subplot => {
        const original = state.subplots.subplots.find(s => s.id === subplot.id);
        if (original && (
          original.startChapter !== subplot.startChapter ||
          original.endChapter !== subplot.endChapter
        )) {
          dispatch(updateSubplot(subplot));
        }
      });
    }
    
    // Validate state after reordering
    const newState = getState().outline;
    const validationResult = ReferentialIntegrityService.validateState(newState);
    
    if (!validationResult.isValid) {
      console.warn('Data integrity issues after chapter reordering:', validationResult.errors);
    }
  }
);

/**
 * Validate entire state and return report
 */
export const validateStateIntegrity = createAsyncThunk<
  ValidationResult,
  void,
  { state: RootState }
>(
  'crossModule/validateStateIntegrity',
  async (_, { getState }) => {
    const state = getState().outline;
    return ReferentialIntegrityService.validateState(state);
  }
);

/**
 * Execute automated cleanup of all integrity issues
 */
export const executeAutomatedCleanup = createAsyncThunk<
  CleanupAction[],
  void,
  { dispatch: AppDispatch; state: RootState }
>(
  'crossModule/executeAutomatedCleanup',
  async (_, { dispatch, getState }) => {
    const state = getState().outline;
    const cleanupActions = ReferentialIntegrityService.generateCleanupActions(state);
    
    // Execute all cleanup actions
    for (const action of cleanupActions) {
      await executeCleanupAction(action, dispatch, getState);
    }
    
    return cleanupActions;
  }
);

// Helper functions

/**
 * Generate cleanup actions for character deletion
 */
async function generateCharacterCleanupActions(
  characterId: string,
  state: any
): Promise<CleanupAction[]> {
  const actions: CleanupAction[] = [];
  
  // Timeline events cleanup
  state.timeline.events.forEach((event: any) => {
    if (event.characters.includes(characterId)) {
      actions.push({
        type: 'remove_reference',
        module: 'timeline',
        entityId: event.id,
        field: 'characters',
        oldValue: event.characters,
        newValue: event.characters.filter((id: string) => id !== characterId),
        description: `Remove character ${characterId} from timeline event ${event.title}`
      });
    }
  });
  
  // Chapter scenes cleanup
  state.chapters.chapters.forEach((chapter: any) => {
    chapter.keyScenes.forEach((scene: any) => {
      if (scene.characters.includes(characterId)) {
        actions.push({
          type: 'remove_reference',
          module: 'chapters',
          entityId: scene.id,
          field: 'characters',
          oldValue: scene.characters,
          newValue: scene.characters.filter((id: string) => id !== characterId),
          description: `Remove character ${characterId} from scene ${scene.title}`
        });
      }
    });
  });
  
  // Subplot cleanup
  state.subplots.subplots.forEach((subplot: any) => {
    if (subplot.relatedCharacters.includes(characterId)) {
      actions.push({
        type: 'remove_reference',
        module: 'subplots',
        entityId: subplot.id,
        field: 'relatedCharacters',
        oldValue: subplot.relatedCharacters,
        newValue: subplot.relatedCharacters.filter((id: string) => id !== characterId),
        description: `Remove character ${characterId} from subplot ${subplot.title}`
      });
    }
  });
  
  // Secondary stories cleanup
  const storiesToDelete = state.subplots.secondaryStories.filter(
    (story: any) => story.characterId === characterId
  );
  
  storiesToDelete.forEach((story: any) => {
    actions.push({
      type: 'delete_entity',
      module: 'secondary_stories',
      entityId: story.id,
      description: `Delete secondary story ${story.title} for character ${characterId}`
    });
  });
  
  // Ideas cleanup
  state.ideas.ideas.forEach((idea: any) => {
    const hasCharacterReference = idea.relatedElements.some(
      (element: any) => element.type === 'character' && element.id === characterId
    );
    
    if (hasCharacterReference) {
      actions.push({
        type: 'remove_reference',
        module: 'ideas',
        entityId: idea.id,
        field: 'relatedElements',
        oldValue: idea.relatedElements,
        newValue: idea.relatedElements.filter(
          (element: any) => !(element.type === 'character' && element.id === characterId)
        ),
        description: `Remove character ${characterId} reference from idea ${idea.title}`
      });
    }
  });
  
  return actions;
}

/**
 * Execute a single cleanup action
 */
async function executeCleanupAction(
  action: CleanupAction,
  dispatch: AppDispatch,
  getState: () => RootState
): Promise<void> {
  const state = getState().outline;
  
  switch (action.type) {
    case 'remove_reference':
      await executeRemoveReferenceAction(action, dispatch, state);
      break;
    
    case 'update_field':
      await executeUpdateFieldAction(action, dispatch, state);
      break;
    
    case 'delete_entity':
      await executeDeleteEntityAction(action, dispatch, state);
      break;
    
    default:
      console.warn(`Unknown cleanup action type: ${action.type}`);
  }
}

/**
 * Execute remove reference cleanup action
 */
async function executeRemoveReferenceAction(
  action: CleanupAction,
  dispatch: AppDispatch,
  state: any
): Promise<void> {
  switch (action.module) {
    case 'timeline':
      const event = state.timeline.events.find((e: any) => e.id === action.entityId);
      if (event && action.newValue) {
        const updatedTimeline = {
          ...state.timeline,
          events: state.timeline.events.map((e: any) => 
            e.id === action.entityId 
              ? { ...e, [action.field!]: action.newValue }
              : e
          )
        };
        dispatch(updateTimeline(updatedTimeline));
      }
      break;
    
    case 'chapters':
      const chapter = state.chapters.chapters.find((c: any) => 
        c.keyScenes.some((s: any) => s.id === action.entityId)
      );
      if (chapter && action.newValue) {
        const updatedChapter = {
          ...chapter,
          keyScenes: chapter.keyScenes.map((scene: any) =>
            scene.id === action.entityId
              ? { ...scene, [action.field!]: action.newValue }
              : scene
          )
        };
        dispatch(updateChapter(updatedChapter));
      }
      break;
    
    case 'subplots':
      const subplot = state.subplots.subplots.find((s: any) => s.id === action.entityId);
      if (subplot && action.newValue) {
        const updatedSubplot = {
          ...subplot,
          [action.field!]: action.newValue
        };
        dispatch(updateSubplot(updatedSubplot));
      }
      break;
    
    case 'ideas':
      const idea = state.ideas.ideas.find((i: any) => i.id === action.entityId);
      if (idea && action.newValue) {
        const updatedIdea = {
          ...idea,
          [action.field!]: action.newValue
        };
        dispatch(updateIdea(updatedIdea));
      }
      break;
  }
}

/**
 * Execute update field cleanup action
 */
async function executeUpdateFieldAction(
  action: CleanupAction,
  dispatch: AppDispatch,
  state: any
): Promise<void> {
  // Similar implementation to remove reference but for field updates
  switch (action.module) {
    case 'subplots':
      const subplot = state.subplots.subplots.find((s: any) => s.id === action.entityId);
      if (subplot) {
        const updatedSubplot = {
          ...subplot,
          [action.field!]: action.newValue
        };
        dispatch(updateSubplot(updatedSubplot));
      }
      break;
  }
}

/**
 * Execute delete entity cleanup action
 */
async function executeDeleteEntityAction(
  action: CleanupAction,
  dispatch: AppDispatch,
  state: any
): Promise<void> {
  switch (action.module) {
    case 'secondary_stories':
      dispatch(deleteSecondaryStory(action.entityId));
      break;
  }
}

// Export simplified action creators
export const integrityActions = {
  deleteCharacterSafely: deleteCharacterWithCleanup,
  updateCharacterWithSync: updateCharacterWithPropagation,
  reorderChaptersWithSync,
  validateState: validateStateIntegrity,
  runCleanup: executeAutomatedCleanup
};