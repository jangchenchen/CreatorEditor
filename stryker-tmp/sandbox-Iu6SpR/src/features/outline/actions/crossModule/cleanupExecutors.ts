/**
 * Cleanup Action Executors
 * Executes cleanup actions on the Redux state
 */
// @ts-nocheck


import { AppDispatch, RootState } from '../../../../app/store';
import {
  updateTimeline,
  updateChapter,
  updateSubplot,
  updateIdea,
  deleteSecondaryStory,
} from '../../slices/rootOutlineSlice';
import { CleanupAction } from '../../services/referentialIntegrityService';

/**
 * Execute a single cleanup action
 */
export async function executeCleanupAction(
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
      await executeTimelineReferenceRemoval(action, dispatch, state);
      break;

    case 'chapters':
      await executeChapterReferenceRemoval(action, dispatch, state);
      break;

    case 'subplots':
      await executeSubplotReferenceRemoval(action, dispatch, state);
      break;

    case 'ideas':
      await executeIdeaReferenceRemoval(action, dispatch, state);
      break;
  }
}

/**
 * Execute timeline reference removal
 */
async function executeTimelineReferenceRemoval(
  action: CleanupAction,
  dispatch: AppDispatch,
  state: any
): Promise<void> {
  const event = state.timeline.events.find((e: any) => e.id === action.entityId);
  if (event && action.newValue) {
    const updatedTimeline = {
      ...state.timeline,
      events: state.timeline.events.map((e: any) =>
        e.id === action.entityId ? { ...e, [action.field!]: action.newValue } : e
      ),
    };
    dispatch(updateTimeline(updatedTimeline));
  }
}

/**
 * Execute chapter reference removal
 */
async function executeChapterReferenceRemoval(
  action: CleanupAction,
  dispatch: AppDispatch,
  state: any
): Promise<void> {
  const chapter = state.chapters.chapters.find((c: any) =>
    c.keyScenes.some((s: any) => s.id === action.entityId)
  );
  if (chapter && action.newValue) {
    const updatedChapter = {
      ...chapter,
      keyScenes: chapter.keyScenes.map((scene: any) =>
        scene.id === action.entityId ? { ...scene, [action.field!]: action.newValue } : scene
      ),
    };
    dispatch(updateChapter(updatedChapter));
  }
}

/**
 * Execute subplot reference removal
 */
async function executeSubplotReferenceRemoval(
  action: CleanupAction,
  dispatch: AppDispatch,
  state: any
): Promise<void> {
  const subplot = state.subplots.subplots.find((s: any) => s.id === action.entityId);
  if (subplot && action.newValue) {
    const updatedSubplot = {
      ...subplot,
      [action.field!]: action.newValue,
    };
    dispatch(updateSubplot(updatedSubplot));
  }
}

/**
 * Execute idea reference removal
 */
async function executeIdeaReferenceRemoval(
  action: CleanupAction,
  dispatch: AppDispatch,
  state: any
): Promise<void> {
  const idea = state.ideas.ideas.find((i: any) => i.id === action.entityId);
  if (idea && action.newValue) {
    const updatedIdea = {
      ...idea,
      [action.field!]: action.newValue,
    };
    dispatch(updateIdea(updatedIdea));
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
  switch (action.module) {
    case 'subplots':
      const subplot = state.subplots.subplots.find((s: any) => s.id === action.entityId);
      if (subplot) {
        const updatedSubplot = {
          ...subplot,
          [action.field!]: action.newValue,
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
