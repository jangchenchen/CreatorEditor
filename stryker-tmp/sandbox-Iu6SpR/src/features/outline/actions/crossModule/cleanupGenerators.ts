/**
 * Cleanup Action Generators
 * Generates cleanup actions for various data integrity scenarios
 */
// @ts-nocheck


import { CleanupAction } from '../../services/referentialIntegrityService';

/**
 * Generate cleanup actions for character deletion
 */
export async function generateCharacterCleanupActions(
  characterId: string,
  state: any
): Promise<CleanupAction[]> {
  const actions: CleanupAction[] = [];

  // Timeline events cleanup
  addTimelineCleanupActions(actions, characterId, state);

  // Chapter scenes cleanup
  addChapterSceneCleanupActions(actions, characterId, state);

  // Subplot cleanup
  addSubplotCleanupActions(actions, characterId, state);

  // Secondary stories cleanup
  addSecondaryStoriesCleanupActions(actions, characterId, state);

  // Ideas cleanup
  addIdeasCleanupActions(actions, characterId, state);

  return actions;
}

/**
 * Add timeline cleanup actions
 */
function addTimelineCleanupActions(
  actions: CleanupAction[],
  characterId: string,
  state: any
): void {
  state.timeline.events.forEach((event: any) => {
    if (event.characters.includes(characterId)) {
      actions.push({
        type: 'remove_reference',
        module: 'timeline',
        entityId: event.id,
        field: 'characters',
        oldValue: event.characters,
        newValue: event.characters.filter((id: string) => id !== characterId),
        description: `Remove character ${characterId} from timeline event ${event.title}`,
      });
    }
  });
}

/**
 * Add chapter scene cleanup actions
 */
function addChapterSceneCleanupActions(
  actions: CleanupAction[],
  characterId: string,
  state: any
): void {
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
          description: `Remove character ${characterId} from scene ${scene.title}`,
        });
      }
    });
  });
}

/**
 * Add subplot cleanup actions
 */
function addSubplotCleanupActions(actions: CleanupAction[], characterId: string, state: any): void {
  state.subplots.subplots.forEach((subplot: any) => {
    if (subplot.relatedCharacters.includes(characterId)) {
      actions.push({
        type: 'remove_reference',
        module: 'subplots',
        entityId: subplot.id,
        field: 'relatedCharacters',
        oldValue: subplot.relatedCharacters,
        newValue: subplot.relatedCharacters.filter((id: string) => id !== characterId),
        description: `Remove character ${characterId} from subplot ${subplot.title}`,
      });
    }
  });
}

/**
 * Add secondary stories cleanup actions
 */
function addSecondaryStoriesCleanupActions(
  actions: CleanupAction[],
  characterId: string,
  state: any
): void {
  const storiesToDelete = state.subplots.secondaryStories.filter(
    (story: any) => story.characterId === characterId
  );

  storiesToDelete.forEach((story: any) => {
    actions.push({
      type: 'delete_entity',
      module: 'secondary_stories',
      entityId: story.id,
      description: `Delete secondary story ${story.title} for character ${characterId}`,
    });
  });
}

/**
 * Add ideas cleanup actions
 */
function addIdeasCleanupActions(actions: CleanupAction[], characterId: string, state: any): void {
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
        description: `Remove character ${characterId} reference from idea ${idea.title}`,
      });
    }
  });
}
