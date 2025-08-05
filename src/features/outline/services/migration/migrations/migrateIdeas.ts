/**
 * Ideas Data Migration Functions
 * Handles migration of creative ideas and inspiration data structures
 */

import { generateId, safeDate, ensureArray, safeNumber } from '../utils';

/**
 * Migrate ideas data from 0.9.0 to 1.0.0
 */
export function migrateIdeasData(data: any) {
  return {
    id: data.ideas?.id || `ideas_${data.id || generateId()}`,
    ideas: ensureArray(data.ideas?.ideas || data.ideas).map(migrateIdeaItem),
    alternatives: ensureArray(data.ideas?.alternatives),
    inspirationSources: ensureArray(data.ideas?.inspirationSources),
    brainstormingSessions: ensureArray(data.ideas?.brainstormingSessions)
  };
}

/**
 * Migrate individual idea item
 */
function migrateIdeaItem(idea: any) {
  return {
    id: idea.id || generateId(),
    type: idea.type || 'inspiration',
    title: idea.title || 'Untitled Idea',
    content: idea.content || '',
    relatedModule: idea.relatedModule || '',
    relatedElements: ensureArray(idea.relatedElements),
    priority: safeNumber(idea.priority, 3),
    status: idea.status || 'draft',
    tags: ensureArray(idea.tags),
    inspiration: idea.inspiration || '',
    potentialImpact: idea.potentialImpact || '',
    createdAt: safeDate(idea.createdAt),
    lastUpdated: safeDate(idea.lastUpdated)
  };
}