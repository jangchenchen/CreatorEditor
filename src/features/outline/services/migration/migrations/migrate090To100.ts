/**
 * Migration from version 0.9.0 to 1.0.0
 * Coordinates migration of all data structures using specialized modules
 */

import { generateId, safeDate } from '../utils';
import { migrateStoryData } from './migrateStory';
import { migrateCharactersData, migrateRelationshipsData } from './migrateCharacters';
import { migrateTimelineData } from './migrateTimeline';
import { migrateChaptersData } from './migrateChapters';
import { migrateWorldData } from './migrateWorld';
import { migrateThemesData, migrateSubplotsData } from './migrateThemes';
import { migrateIdeasData } from './migrateIdeas';

/**
 * Main migration function from 0.9.0 to 1.0.0
 * Orchestrates migration of all data modules
 */
export function migrateFrom090To100(data: any): any {
  const migratedData = {
    // Basic project information
    id: data.id || generateId(),
    projectName: data.projectName || data.name || 'Untitled Project',
    version: '1.0.0',
    createdAt: safeDate(data.createdAt),
    lastUpdated: safeDate(data.lastUpdated),

    // Migrate story data
    story: migrateStoryData(data),

    // Migrate character and relationship data
    characters: migrateCharactersData(data.characters || []),
    relationships: migrateRelationshipsData(data.relationships || []),

    // Migrate timeline data
    timeline: migrateTimelineData(data),

    // Migrate world building data  
    world: migrateWorldData(data),

    // Migrate chapters data
    chapters: migrateChaptersData(data),

    // Migrate themes and subplots data  
    themes: migrateThemesData(data),
    subplots: migrateSubplotsData(data),

    // Migrate ideas data
    ideas: migrateIdeasData(data)
  };

  return migratedData;
}