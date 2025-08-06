/**
 * Migration Constants and Strategies
 * Configuration for migration system
 */

import { MigrationStrategy } from './types';
import { migrateFrom090To100 } from './migrations/migrate090To100';
import { validateVersion100 } from './validators/schemaValidators';

// Current schema version
export const CURRENT_SCHEMA_VERSION = '1.0.0';

// Migration strategies for different version transitions
export const MIGRATION_STRATEGIES: MigrationStrategy[] = [
  {
    fromVersion: '0.9.0',
    toVersion: '1.0.0',
    description: 'Initial migration to structured schema',
    migrate: (data: any) => migrateFrom090To100(data),
    validate: (data: any) => validateVersion100(data),
  },
  // Add more migration strategies as schema evolves
];
