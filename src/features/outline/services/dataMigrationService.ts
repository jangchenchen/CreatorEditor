/**
 * Data Migration Service - Entry Point
 * Re-exports the modularized migration service for backward compatibility
 */

export { 
  default as DataMigrationService,
  CURRENT_SCHEMA_VERSION,
  MIGRATION_STRATEGIES
} from './migration';

export type { 
  MigrationStrategy, 
  MigrationInfo, 
  MigrationResult 
} from './migration';

// For backward compatibility
export { DataMigrationService as default } from './migration';