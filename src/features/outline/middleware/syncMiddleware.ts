import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import {
  loadTimelineData,
  updateChapter,
  updateSubplot,
  updateSecondaryStory,
  updateCreativeIdea
} from '../slices/rootOutlineSlice';

export const syncMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const result = next(action);
  
  // Handle character deletions - cascade cleanup across all modules
  if (action.type === 'outline/deleteCharacter') {
    const characterId = action.payload;
    const state = store.getState().outline;
    
    handleCharacterDeletionCleanup(store, characterId, state);
  }
  
  // Handle character updates - propagate name/role changes
  if (action.type === 'outline/updateCharacter') {
    const characterData = action.payload;
    const state = store.getState().outline;
    
    handleCharacterUpdatePropagation(store, characterData, state);
  }
  
  // Handle chapter reordering - update subplot chapter ranges
  if (action.type === 'outline/reorderChapters') {
    const chapterMapping = action.payload;
    const state = store.getState().outline;
    
    handleChapterReorderingSync(store, chapterMapping, state);
  }
  
  return result;
};

const handleCharacterDeletionCleanup = (store: any, characterId: string, state: any) => {
  // Clean timeline events
  const updatedEvents = state.timeline.events.map((event: any) => ({
    ...event,
    characters: event.characters.filter((id: string) => id !== characterId)
  }));
  
  if (JSON.stringify(updatedEvents) !== JSON.stringify(state.timeline.events)) {
    store.dispatch(loadTimelineData({
      ...state.timeline,
      events: updatedEvents
    }));
  }
  
  // Clean chapter scenes
  const updatedChapters = state.chapters.chapters.map((chapter: any) => ({
    ...chapter,
    keyScenes: chapter.keyScenes.map((scene: any) => ({
      ...scene,
      characters: scene.characters.filter((id: string) => id !== characterId)
    }))
  }));
  
  let chaptersChanged = false;
  for (let i = 0; i < updatedChapters.length; i++) {
    if (JSON.stringify(updatedChapters[i].keyScenes) !== JSON.stringify(state.chapters.chapters[i].keyScenes)) {
      chaptersChanged = true;
      break;
    }
  }
  
  if (chaptersChanged) {
    updatedChapters.forEach((chapter: any) => {
      store.dispatch(updateChapter(chapter));
    });
  }
  
  // Clean subplot related characters
  const updatedSubplots = state.subplots.subplots.map((subplot: any) => ({
    ...subplot,
    relatedCharacters: subplot.relatedCharacters.filter((id: string) => id !== characterId)
  }));
  
  let subplotsChanged = false;
  for (let i = 0; i < updatedSubplots.length; i++) {
    if (JSON.stringify(updatedSubplots[i].relatedCharacters) !== JSON.stringify(state.subplots.subplots[i].relatedCharacters)) {
      subplotsChanged = true;
      break;
    }
  }
  
  if (subplotsChanged) {
    updatedSubplots.forEach((subplot: any) => {
      store.dispatch(updateSubplot(subplot));
    });
  }
  
  // Clean secondary character stories
  const updatedSecondaryStories = state.subplots.secondaryStories.filter(
    (story: any) => story.characterId !== characterId
  );
  
  if (updatedSecondaryStories.length !== state.subplots.secondaryStories.length) {
    // Dispatch individual story deletions to maintain state consistency
    state.subplots.secondaryStories
      .filter((story: any) => story.characterId === characterId)
      .forEach((story: any) => {
        // Note: This would need a deleteSecondaryStory action to be implemented
        console.warn(`Secondary story ${story.id} needs cleanup for deleted character ${characterId}`);
      });
  }
  
  // Clean ideas related elements
  const updatedIdeas = state.ideas.ideas.map((idea: any) => ({
    ...idea,
    relatedElements: idea.relatedElements.filter((element: any) => 
      !(element.type === 'character' && element.id === characterId)
    )
  }));
  
  let ideasChanged = false;
  for (let i = 0; i < updatedIdeas.length; i++) {
    if (JSON.stringify(updatedIdeas[i].relatedElements) !== JSON.stringify(state.ideas.ideas[i].relatedElements)) {
      ideasChanged = true;
      break;
    }
  }
  
  if (ideasChanged) {
    updatedIdeas.forEach((idea: any) => {
      store.dispatch(updateCreativeIdea(idea));
    });
  }
};

const handleCharacterUpdatePropagation = (store: any, characterData: any, state: any) => {
  // Character updates typically don't require cascading changes
  // since references use IDs, but we could add validation here
  
  // Log character update for debugging
  console.log(`Character ${characterData.id} updated:`, characterData);
};

const handleChapterReorderingSync = (store: any, chapterMapping: any, state: any) => {
  // Update subplot chapter references when chapters are reordered
  const updatedSubplots = state.subplots.subplots.map((subplot: any) => {
    const updatedSubplot = { ...subplot };
    
    // Update start chapter if it exists in mapping
    if (subplot.startChapter && chapterMapping[subplot.startChapter]) {
      updatedSubplot.startChapter = chapterMapping[subplot.startChapter];
    }
    
    // Update end chapter if it exists in mapping
    if (subplot.endChapter && chapterMapping[subplot.endChapter]) {
      updatedSubplot.endChapter = chapterMapping[subplot.endChapter];
    }
    
    return updatedSubplot;
  });
  
  // Check if any subplots were actually changed
  let subplotsChanged = false;
  for (let i = 0; i < updatedSubplots.length; i++) {
    if (updatedSubplots[i].startChapter !== state.subplots.subplots[i].startChapter ||
        updatedSubplots[i].endChapter !== state.subplots.subplots[i].endChapter) {
      subplotsChanged = true;
      break;
    }
  }
  
  if (subplotsChanged) {
    updatedSubplots.forEach((subplot: any) => {
      store.dispatch(updateSubplot(subplot));
    });
  }
};