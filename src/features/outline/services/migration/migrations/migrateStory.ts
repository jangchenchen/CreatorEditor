/**
 * Story Data Migration Functions
 * Handles migration of story-related data structures
 */

import { generateId, ensureArray } from '../utils';

/**
 * Migrate story data from 0.9.0 to 1.0.0
 */
export function migrateStoryData(data: any) {
  return {
    id: data.story?.id || `story_${data.id || generateId()}`,
    background: {
      era: data.story?.background?.era || '',
      location: data.story?.background?.location || '',
      socialEnvironment: data.story?.background?.socialEnvironment || '',
      historicalContext: data.story?.background?.historicalContext || '',
    },
    coreTheme: {
      theme: data.story?.coreTheme?.theme || data.story?.theme || '',
      conflict: data.story?.coreTheme?.conflict || data.story?.conflict || '',
      message: data.story?.coreTheme?.message || '',
      keywords: ensureArray(data.story?.coreTheme?.keywords || data.story?.keywords),
    },
    synopsis: {
      beginning: data.story?.synopsis?.beginning || data.story?.beginning || '',
      development: data.story?.synopsis?.development || data.story?.development || '',
      climax: data.story?.synopsis?.climax || data.story?.climax || '',
      ending: data.story?.synopsis?.ending || data.story?.ending || '',
      overallTone: data.story?.synopsis?.overallTone || data.story?.tone || '',
    },
    lastUpdated: new Date(),
  };
}
