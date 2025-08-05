/**
 * Chapters Data Migration Functions
 * Handles migration of chapter and scene data structures
 */

import { generateId, ensureArray, safeNumber } from '../utils';

/**
 * Migrate chapters data from 0.9.0 to 1.0.0
 */
export function migrateChaptersData(data: any) {
  return {
    id: data.chapters?.id || `chapters_${data.id || generateId()}`,
    chapters: ensureArray(data.chapters?.chapters || data.chapters).map((chapter: any) => ({
      id: chapter.id || generateId(),
      number: safeNumber(chapter.number, 1),
      title: chapter.title || `Chapter ${chapter.number || 1}`,
      summary: chapter.summary || '',
      keyScenes: migrateScenes(chapter.keyScenes || chapter.scenes),
      characters: ensureArray(chapter.characters),
      plotPoints: ensureArray(chapter.plotPoints),
      conflicts: ensureArray(chapter.conflicts),
      themes: ensureArray(chapter.themes),
      wordCountTarget: safeNumber(chapter.wordCountTarget, 2000),
      status: chapter.status || 'planned',
      transitions: {
        from: chapter.transitions?.from || '',
        to: chapter.transitions?.to || '',
        method: chapter.transitions?.method || ''
      },
      notes: chapter.notes || ''
    })),
    totalChapters: data.chapters?.totalChapters || (data.chapters?.chapters || []).length,
    overallStructure: data.chapters?.overallStructure || ''
  };
}

/**
 * Migrate scene data within chapters
 */
function migrateScenes(scenes: any[]) {
  return ensureArray(scenes).map((scene: any) => ({
    id: scene.id || generateId(),
    title: scene.title || 'Untitled Scene',
    description: scene.description || '',
    location: scene.location || '',
    characters: ensureArray(scene.characters),
    purpose: scene.purpose || '',
    conflict: scene.conflict || '',
    outcome: scene.outcome || ''
  }));
}