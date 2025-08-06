// @ts-nocheck
import { OutlineState } from './types';

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
    lastUpdated: outline.project.lastUpdated,
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
      lastUpdated: outline.story.lastUpdated,
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
    lastUpdated: outline.project.lastUpdated,
  };

  return outlineData;
};

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
    characters:
      outline.characters.characters.length > 0
        ? Math.min(100, outline.characters.characters.length * 25)
        : 0,
    timeline:
      outline.timeline.events.length > 0 ? Math.min(100, outline.timeline.events.length * 20) : 0,
    chapters:
      outline.chapters.chapters.length > 0
        ? Math.min(100, outline.chapters.chapters.length * 10)
        : 0,
    subplots:
      outline.subplots.subplots.length > 0
        ? Math.min(100, outline.subplots.subplots.length * 30)
        : 0,
    ideas: outline.ideas.ideas.length > 0 ? Math.min(100, outline.ideas.ideas.length * 15) : 0,
  };
};
