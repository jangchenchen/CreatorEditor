// New modular outline slice - exports everything from the root slice
// This provides backward compatibility while using the new modular architecture

export {
  outlineReducer as default,
  type OutlineState,
  
  // Project actions
  setProjectName,
  initializeProject,
  updateLastModified,
  
  // Story actions
  updateStoryBackground,
  updateCoreTheme,
  updateSynopsis,
  
  // Character actions
  addCharacter,
  updateCharacter,
  deleteCharacter,
  addRelationship,
  updateRelationship,
  deleteRelationship,
  
  // Timeline actions
  addPlotEvent,
  updatePlotEvent,
  deletePlotEvent,
  updateTimelineInfo,
  
  // Chapter actions
  addChapter,
  updateChapter,
  deleteChapter,
  updateChapterStructure,
  
  // Subplot actions
  addSubplot,
  updateSubplot,
  deleteSubplot,
  addSecondaryStory,
  updateSecondaryStory,
  deleteSecondaryStory,
  
  // Ideas actions
  addCreativeIdea,
  updateCreativeIdea,
  deleteCreativeIdea,
  updateIdeaStatus,
  addPlotAlternative,
  updatePlotAlternative,
  deletePlotAlternative,
  
  // Selectors
  selectOutline,
  selectProject,
  selectStoryOverview,
  selectStoryBackground,
  selectCoreTheme,
  selectSynopsis,
  selectCharacters,
  selectRelationships,
  selectTimeline,
  selectPlotEvents,
  selectKeyEvents,
  selectChapters,
  selectChapterList,
  selectSubplots,
  selectActiveSubplots,
  selectCreativeIdeas,
  selectCharacterById,
  selectCharactersByRole,
  selectCharacterRelationships,
  selectIdeasByStatus,
  selectIdeasByType,
  selectOutlineStats,
  selectModuleCompletionRates
} from './slices/rootOutlineSlice';

// Additional actions for backward compatibility
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OutlineData } from './types/outline.types';

// Create a compatibility slice for actions that don't fit into the modular structure
const compatibilitySlice = createSlice({
  name: 'compatibility',
  initialState: {},
  reducers: {
    loadOutlineData: (state, action: PayloadAction<OutlineData>) => {
      // This would need to be handled by dispatching multiple actions to different slices
      // For now, we'll just return the action for the store to handle
      return action.payload;
    },
    
    resetOutline: () => {
      // This would need to reset all slices
      return {};
    },
    
    markModuleUpdated: (state, action) => {
      // This can be handled by individual slice update actions
      return state;
    }
  }
});

export const { loadOutlineData, resetOutline, markModuleUpdated } = compatibilitySlice.actions;