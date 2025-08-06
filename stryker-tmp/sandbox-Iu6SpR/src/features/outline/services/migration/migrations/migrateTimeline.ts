/**
 * Timeline Data Migration Functions
 * Handles migration of timeline and event data structures
 */
// @ts-nocheck


import { generateId, ensureArray, safeBoolean } from '../utils';

/**
 * Migrate timeline data from 0.9.0 to 1.0.0
 */
export function migrateTimelineData(data: any) {
  return {
    id: data.timeline?.id || `timeline_${data.id || generateId()}`,
    events: ensureArray(data.timeline?.events || data.events).map((event: any) => ({
      id: event.id || generateId(),
      timestamp: event.timestamp || event.time || '',
      title: event.title || event.name || 'Untitled Event',
      description: event.description || '',
      type: event.type || 'development',
      importance: event.importance || 'minor',
      isKeyEvent: safeBoolean(event.isKeyEvent, false),
      characters: ensureArray(event.characters),
      locations: ensureArray(event.locations),
      impact: event.impact || '',
      consequences: ensureArray(event.consequences),
      relatedEvents: ensureArray(event.relatedEvents),
      tags: ensureArray(event.tags),
    })),
    startTime: data.timeline?.startTime || '',
    endTime: data.timeline?.endTime || '',
    timelineNotes: data.timeline?.timelineNotes || data.timeline?.notes || '',
  };
}
