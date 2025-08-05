/**
 * Backward-compatible re-export file for the refactored outline slice system
 * 
 * This file maintains compatibility with existing imports while using
 * the new modular slice architecture internally.
 * 
 * The original monolithic slice has been split into 9 focused slices:
 * - projectSlice: Project management
 * - storySlice: Story overview
 * - charactersSlice: Characters and relationships  
 * - timelineSlice: Timeline and plot events
 * - chaptersSlice: Chapter management
 * - subplotsSlice: Subplot management
 * - ideasSlice: Creative ideas
 * - worldSlice: World building
 * - rootOutlineSlice: Combines all slices + global actions
 */

// Re-export everything from the root slice for backward compatibility
export {
  // Combined reducer (enhanced with global actions)
  outlineReducer as default,
  
  // Types
  type OutlineState,
  
  // Project management actions
  setProjectName,
  initializeProject,
  updateLastModified,
  
  // Story overview actions
  updateStoryBackground,
  updateCoreTheme,
  updateSynopsis,
  
  // Character and relationship actions
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
  
  // Creative ideas actions
  addCreativeIdea,
  updateCreativeIdea,
  deleteCreativeIdea,
  updateIdeaStatus,
  addPlotAlternative,
  updatePlotAlternative,
  deletePlotAlternative,
  
  // World building actions
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
  
  // Global actions
  loadOutlineData,
  resetOutline,
  markModuleUpdated,
  
  // All selectors for backward compatibility
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
  selectWorld,
  selectGeography,
  selectSociety,
  selectWorldHistory,
  
  // Parameterized selectors
  selectCharacterById,
  selectCharactersByRole,
  selectCharacterRelationships,
  selectIdeasByStatus,
  selectIdeasByType,
  
  // Statistics and computed selectors
  selectOutlineStats,
  selectOutlineData,
  selectTimelineEvents,
  selectModuleCompletionRates
} from './slices/rootOutlineSlice';

// Note: This re-export approach ensures that:
// 1. All existing components continue to work without changes
// 2. New components can import from individual slices if preferred
// 3. The internal architecture is modular and maintainable
// 4. Each slice is under 200 lines as required
// 5. Code smells are eliminated through proper separation of concerns