/**
 * Data Migration Types
 * Type definitions for the migration system
 */

export interface MigrationStrategy {
  fromVersion: string;
  toVersion: string;
  description: string;
  migrate: (data: any) => any;
  validate: (data: any) => boolean;
}

export interface MigrationInfo {
  needed: boolean;
  path: string[];
  strategies: MigrationStrategy[];
}

export interface MigrationResult {
  success: boolean;
  data?: any;
  error?: string;
  migratedFrom?: string;
  migratedTo?: string;
}
