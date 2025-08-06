// Re-export all actions from individual slices for backward compatibility

// Project actions
export { setProjectName, initializeProject, updateLastModified } from '../projectSlice';

// Story actions
export { updateStoryBackground, updateCoreTheme, updateSynopsis } from '../storySlice';

// Character actions
export {
  addCharacter,
  updateCharacter,
  deleteCharacter,
  addRelationship,
  updateRelationship,
  deleteRelationship,
} from '../charactersSlice';

// Timeline actions
export {
  addPlotEvent,
  updatePlotEvent,
  deletePlotEvent,
  updateTimelineInfo,
  loadTimelineData,
} from '../timelineSlice';

// Chapter actions
export { addChapter, updateChapter, deleteChapter, updateChapterStructure } from '../chaptersSlice';

// Subplot actions
export {
  addSubplot,
  updateSubplot,
  deleteSubplot,
  addSecondaryStory,
  updateSecondaryStory,
  deleteSecondaryStory,
} from '../subplotsSlice';

// Ideas actions
export {
  addCreativeIdea,
  updateCreativeIdea,
  deleteCreativeIdea,
  updateIdeaStatus,
  addPlotAlternative,
  updatePlotAlternative,
  deletePlotAlternative,
  loadIdeasData,
} from '../ideasSlice';

// World actions
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
  updateInspirationSource,
} from '../worldSlice';

// Global actions
export { loadOutlineData, resetOutline, markModuleUpdated } from './globalActions';
