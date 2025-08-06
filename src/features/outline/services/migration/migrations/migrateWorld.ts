/**
 * World Building Data Migration Functions
 * Handles migration of world building and setting data structures
 */

import { generateId, ensureArray } from '../utils';

/**
 * Migrate world building data from 0.9.0 to 1.0.0
 */
export function migrateWorldData(data: any) {
  return {
    id: `world_${data.id || generateId()}`,
    geography: migrateGeographyData(data.world?.geography),
    society: migrateSocietyData(data.world?.society),
    history: migrateHistoryData(data.world?.history),
    customRules: ensureArray(data.world?.customRules),
    inspirationSources: ensureArray(data.world?.inspirationSources),
  };
}

/**
 * Migrate geography data
 */
function migrateGeographyData(geography: any) {
  return {
    regions: ensureArray(geography?.regions),
    climate: geography?.climate || '',
    landmarks: ensureArray(geography?.landmarks),
    naturalFeatures: ensureArray(geography?.naturalFeatures),
  };
}

/**
 * Migrate society data
 */
function migrateSocietyData(society: any) {
  return {
    political: society?.political || '',
    economic: society?.economic || '',
    cultural: ensureArray(society?.cultural),
    religious: society?.religious || '',
    technology: society?.technology || '',
    socialClasses: ensureArray(society?.socialClasses),
  };
}

/**
 * Migrate history data
 */
function migrateHistoryData(history: any) {
  return {
    timeline: ensureArray(history?.timeline),
    legends: ensureArray(history?.legends),
    familySecrets: ensureArray(history?.familySecrets),
    mysteries: ensureArray(history?.mysteries),
  };
}
