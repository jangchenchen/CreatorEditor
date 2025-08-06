// @ts-nocheck
// Re-export all selectors for backward compatibility

// Basic selectors
export {
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
} from './basicSelectors';

// Filtered selectors
export {
  selectCharacterById,
  selectCharactersByRole,
  selectCharacterRelationships,
  selectIdeasByStatus,
  selectIdeasByType,
  selectTimelineEvents,
} from './filteredSelectors';

// Derived selectors
export {
  selectOutlineStats,
  selectOutlineData,
  selectModuleCompletionRates,
} from './derivedSelectors';
