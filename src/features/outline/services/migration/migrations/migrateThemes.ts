/**
 * Themes Data Migration Functions
 * Handles migration of theme and subplot data structures
 */

import { generateId, ensureArray, safeNumber } from '../utils';

/**
 * Migrate themes data from 0.9.0 to 1.0.0
 */
export function migrateThemesData(data: any) {
  return {
    id: `themes_${data.id || generateId()}`,
    themes: {
      primary: data.themes?.themes?.primary || data.story?.coreTheme?.theme || '',
      secondary: ensureArray(data.themes?.themes?.secondary),
      symbols: ensureArray(data.themes?.themes?.symbols),
      metaphors: ensureArray(data.themes?.themes?.metaphors),
      motifs: ensureArray(data.themes?.themes?.motifs),
    },
    characterMotivations: ensureArray(data.themes?.characterMotivations),
    philosophicalQuestions: ensureArray(data.themes?.philosophicalQuestions),
    socialCommentary: ensureArray(data.themes?.socialCommentary),
    personalReflections: ensureArray(data.themes?.personalReflections),
  };
}

/**
 * Migrate subplots data from 0.9.0 to 1.0.0
 */
export function migrateSubplotsData(data: any) {
  return {
    id: data.subplots?.id || `subplots_${data.id || generateId()}`,
    subplots: ensureArray(data.subplots?.subplots || data.subplots).map((subplot: any) => ({
      id: subplot.id || generateId(),
      title: subplot.title || 'Untitled Subplot',
      description: subplot.description || '',
      purpose: subplot.purpose || 'character-development',
      status: subplot.status || 'planned',
      relatedCharacters: ensureArray(subplot.relatedCharacters),
      startChapter: safeNumber(subplot.startChapter, 1),
      endChapter: safeNumber(subplot.endChapter, 1),
      connection: subplot.connection || '',
      resolution: subplot.resolution || '',
      impact: subplot.impact || '',
    })),
    secondaryStories: ensureArray(data.subplots?.secondaryStories),
    weavingStrategy: data.subplots?.weavingStrategy || '',
  };
}
