/**
 * Characters Data Migration Functions
 * Handles migration of character and relationship data structures
 */

import { generateId, safeDate, ensureArray, safeNumber, safeBoolean } from '../utils';

/**
 * Migrate characters data from 0.9.0 to 1.0.0
 */
export function migrateCharactersData(characters: any[]) {
  return ensureArray(characters).map((char: any) => ({
    id: char.id || generateId(),
    name: char.name || 'Unnamed Character',
    role: char.role || 'minor',
    background: char.background || '',
    personality: Array.isArray(char.personality) ? char.personality : [char.personality || ''],
    appearance: char.appearance || '',
    goals: char.goals || '',
    motivation: char.motivation || '',
    arc: {
      startState: char.arc?.startState || char.startState || '',
      keyEvents: ensureArray(char.arc?.keyEvents || char.keyEvents),
      endState: char.arc?.endState || char.endState || '',
      growthDirection: char.arc?.growthDirection || char.growthDirection || ''
    },
    tags: ensureArray(char.tags),
    createdAt: safeDate(char.createdAt),
    lastUpdated: safeDate(char.lastUpdated)
  }));
}

/**
 * Migrate relationships data from 0.9.0 to 1.0.0
 */
export function migrateRelationshipsData(relationships: any[]) {
  return ensureArray(relationships).map((rel: any) => ({
    id: rel.id || generateId(),
    fromCharacter: rel.fromCharacter || rel.from || '',
    toCharacter: rel.toCharacter || rel.to || '',
    type: rel.type || 'friend',
    description: rel.description || '',
    intensity: safeNumber(rel.intensity, 5),
    isReversible: safeBoolean(rel.isReversible, true),
    developmentStage: rel.developmentStage || 'established'
  }));
}