/**
 * Migration Service Entry Point
 * Exports all migration-related modules
 */

// Main service
export { default as DataMigrationService } from './DataMigrationService';

// Types
export type { MigrationStrategy, MigrationInfo, MigrationResult } from './types';

// Constants
export { CURRENT_SCHEMA_VERSION, MIGRATION_STRATEGIES } from './constants';

// Utilities
export { generateId, deepClone, safeDate, ensureArray, safeNumber, safeBoolean } from './utils';

// Validators
export {
  validateVersion100,
  validateCharacterStructure,
  validateRelationshipStructure,
} from './validators/schemaValidators';

// Migrations
export { migrateFrom090To100 } from './migrations/migrate090To100';
