import { combineReducers, createAction, PayloadAction } from '@reduxjs/toolkit';
import { OutlineData, OutlineModule } from '../types/outline.types';
import projectReducer from './projectSlice';
import storyReducer from './storySlice';
import charactersReducer from './charactersSlice';
import timelineReducer from './timelineSlice';
import chaptersReducer from './chaptersSlice';
import subplotsReducer from './subplotsSlice';
import ideasReducer from './ideasSlice';
import worldReducer from './worldSlice';

// Combine all the individual slices
const baseOutlineReducer = combineReducers({
  project: projectReducer,
  story: storyReducer,
  characters: charactersReducer,
  timeline: timelineReducer,
  chapters: chaptersReducer,
  subplots: subplotsReducer,
  ideas: ideasReducer,
  world: worldReducer
});

export type OutlineState = ReturnType<typeof baseOutlineReducer>;

// Re-export all actions for backward compatibility
export {
  setProjectName,
  initializeProject,
  updateLastModified
} from './projectSlice';

export {
  updateStoryBackground,
  updateCoreTheme,
  updateSynopsis
} from './storySlice';

export {
  addCharacter,
  updateCharacter,
  deleteCharacter,
  addRelationship,
  updateRelationship,
  deleteRelationship
} from './charactersSlice';

export {
  addPlotEvent,
  updatePlotEvent,
  deletePlotEvent,
  updateTimelineInfo,
  loadTimelineData
} from './timelineSlice';

export {
  addChapter,
  updateChapter,
  deleteChapter,
  updateChapterStructure
} from './chaptersSlice';

export {
  addSubplot,
  updateSubplot,
  deleteSubplot,
  addSecondaryStory,
  updateSecondaryStory,
  deleteSecondaryStory
} from './subplotsSlice';

export {
  addCreativeIdea,
  updateCreativeIdea,
  deleteCreativeIdea,
  updateIdeaStatus,
  addPlotAlternative,
  updatePlotAlternative,
  deletePlotAlternative,
  loadIdeasData
} from './ideasSlice';

export {
  updateGeography,
  addRegion,
  updateRegion,
  deleteRegion,
  updateSociety,
  updateHistory,
  addHistoricalEvent,
  updateHistoricalEvent,
  deleteHistoricalEvent,
  addCustomRule,
  removeCustomRule,
  updateCustomRule,
  addInspirationSource,
  removeInspirationSource,
  updateInspirationSource
} from './worldSlice';

// Global actions that coordinate across multiple slices
export const loadOutlineData = createAction<OutlineData>('outline/loadOutlineData');
export const resetOutline = createAction('outline/resetOutline');
export const markModuleUpdated = createAction<OutlineModule>('outline/markModuleUpdated');

// Enhanced reducer that handles global actions
const rootReducer = (state: OutlineState | undefined, action: any) => {
  // Handle global actions
  if (action.type === 'outline/loadOutlineData') {
    const data = action.payload as OutlineData;
    return {
      project: {
        id: data.id,
        projectName: data.projectName,
        version: data.version,
        createdAt: data.createdAt,
        lastUpdated: data.lastUpdated
      },
      story: data.story,
      characters: {
        characters: data.characters,
        relationships: data.relationships
      },
      timeline: data.timeline,
      chapters: data.chapters,
      subplots: data.subplots,
      ideas: data.ideas,
      world: data.world
    };
  }

  if (action.type === 'outline/resetOutline') {
    return baseOutlineReducer(undefined, { type: '@@INIT' });
  }

  if (action.type === 'outline/markModuleUpdated') {
    const newState = baseOutlineReducer(state, action);
    return {
      ...newState,
      project: {
        ...newState.project,
        lastUpdated: new Date()
      }
    };
  }

  // Delegate to the combined reducer
  return baseOutlineReducer(state, action);
};

// Export the enhanced reducer as the main reducer
export { rootReducer as outlineReducer };
export default rootReducer;

// Global selectors for backward compatibility
export const selectOutline = (state: { outline: OutlineState }) => state.outline;
export const selectProject = (state: { outline: OutlineState }) => state.outline.project;
export const selectStoryOverview = (state: { outline: OutlineState }) => state.outline.story;
export const selectStoryBackground = (state: { outline: OutlineState }) => state.outline.story.background;
export const selectCoreTheme = (state: { outline: OutlineState }) => state.outline.story.coreTheme;
export const selectSynopsis = (state: { outline: OutlineState }) => state.outline.story.synopsis;
export const selectCharacters = (state: { outline: OutlineState }) => state.outline.characters.characters;
export const selectRelationships = (state: { outline: OutlineState }) => state.outline.characters.relationships;
export const selectTimeline = (state: { outline: OutlineState }) => state.outline.timeline;
export const selectPlotEvents = (state: { outline: OutlineState }) => state.outline.timeline.events;
export const selectKeyEvents = (state: { outline: OutlineState }) => 
  state.outline.timeline.events.filter(e => e.isKeyEvent);
export const selectChapters = (state: { outline: OutlineState }) => state.outline.chapters;
export const selectChapterList = (state: { outline: OutlineState }) => state.outline.chapters.chapters;
export const selectSubplots = (state: { outline: OutlineState }) => state.outline.subplots;
export const selectActiveSubplots = (state: { outline: OutlineState }) => 
  state.outline.subplots.subplots.filter(s => s.status === 'active');
export const selectCreativeIdeas = (state: { outline: OutlineState }) => state.outline.ideas;
export const selectWorld = (state: { outline: OutlineState }) => state.outline.world;
export const selectGeography = (state: { outline: OutlineState }) => state.outline.world.geography;
export const selectSociety = (state: { outline: OutlineState }) => state.outline.world.society;
export const selectWorldHistory = (state: { outline: OutlineState }) => state.outline.world.history;

// Character selectors
export const selectCharacterById = (characterId: string) => 
  (state: { outline: OutlineState }) => 
    state.outline.characters.characters.find(c => c.id === characterId);

export const selectCharactersByRole = (role: string) => 
  (state: { outline: OutlineState }) => 
    state.outline.characters.characters.filter(c => c.role === role);

export const selectCharacterRelationships = (characterId: string) => 
  (state: { outline: OutlineState }) => 
    state.outline.characters.relationships.filter(
      r => r.fromCharacter === characterId || r.toCharacter === characterId
    );

// Ideas selectors
export const selectIdeasByStatus = (status: string) => 
  (state: { outline: OutlineState }) => 
    state.outline.ideas.ideas.filter(i => i.status === status);

export const selectIdeasByType = (type: string) => 
  (state: { outline: OutlineState }) => 
    state.outline.ideas.ideas.filter(i => i.type === type);

// Statistics selector
export const selectOutlineStats = (state: { outline: OutlineState }) => {
  const outline = state.outline;
  return {
    charactersCount: outline.characters.characters.length,
    relationshipsCount: outline.characters.relationships.length,
    plotEventsCount: outline.timeline.events.length,
    chaptersCount: outline.chapters.chapters.length,
    subplotsCount: outline.subplots.subplots.length,
    ideasCount: outline.ideas.ideas.length,
    lastUpdated: outline.project.lastUpdated
  };
};

// Complete outline data selector for export
export const selectOutlineData = (state: { outline: OutlineState }) => {
  const outline = state.outline;
  
  // Construct complete outline data structure
  const outlineData = {
    id: outline.project.id,
    projectName: outline.project.name,
    story: {
      id: outline.story.id,
      background: outline.story.background,
      coreTheme: outline.story.coreTheme,
      synopsis: outline.story.synopsis,
      lastUpdated: outline.story.lastUpdated
    },
    characters: outline.characters.characters,
    relationships: outline.characters.relationships,
    timeline: outline.timeline,
    world: outline.world,
    chapters: outline.chapters,
    themes: outline.story.themes || {}, // Add themes if available  
    subplots: outline.subplots,
    ideas: outline.ideas,
    version: outline.project.version,
    createdAt: outline.project.createdAt,
    lastUpdated: outline.project.lastUpdated
  };
  
  return outlineData;
};

// Timeline events selector
export const selectTimelineEvents = (state: { outline: OutlineState }) => state.outline.timeline.events;

// Module completion rates selector
export const selectModuleCompletionRates = (state: { outline: OutlineState }) => {
  const outline = state.outline;
  
  // Calculate story completion
  const calculateStoryCompletion = () => {
    const { background, coreTheme, synopsis } = outline.story;
    let completed = 0;
    const total = 10;
    
    if (background.era) completed++;
    if (background.location) completed++;
    if (background.socialEnvironment) completed++;
    if (background.historicalContext) completed++;
    if (coreTheme.theme) completed++;
    if (coreTheme.conflict) completed++;
    if (synopsis.beginning) completed++;
    if (synopsis.development) completed++;
    if (synopsis.climax) completed++;
    if (synopsis.ending) completed++;
    
    return Math.round((completed / total) * 100);
  };

  return {
    story: calculateStoryCompletion(),
    characters: outline.characters.characters.length > 0 ? Math.min(100, outline.characters.characters.length * 25) : 0,
    timeline: outline.timeline.events.length > 0 ? Math.min(100, outline.timeline.events.length * 20) : 0,
    chapters: outline.chapters.chapters.length > 0 ? Math.min(100, outline.chapters.chapters.length * 10) : 0,
    subplots: outline.subplots.subplots.length > 0 ? Math.min(100, outline.subplots.subplots.length * 30) : 0,
    ideas: outline.ideas.ideas.length > 0 ? Math.min(100, outline.ideas.ideas.length * 15) : 0
  };
};