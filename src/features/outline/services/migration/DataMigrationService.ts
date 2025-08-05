/**
 * Data Migration Service
 * Core service for handling version compatibility and data structure migrations
 */

import { OutlineData } from '../../types/outline.types';
import { MigrationStrategy, MigrationInfo, MigrationResult } from './types';
import { CURRENT_SCHEMA_VERSION, MIGRATION_STRATEGIES } from './constants';
import { validateVersion100 } from './validators/schemaValidators';
import { deepClone } from './utils';

/**
 * Main migration service class
 */
export class DataMigrationService {
  /**
   * Migrate data from any version to current version
   */
  static async migrateToCurrentVersion(data: any): Promise<OutlineData> {
    if (!data) {
      throw new Error('No data provided for migration');
    }

    let currentData = deepClone(data);
    let currentVersion = data.version || '0.9.0'; // Default to oldest version if not specified

    console.log(`Starting migration from version ${currentVersion} to ${CURRENT_SCHEMA_VERSION}`);

    // Apply migration strategies in sequence
    while (currentVersion !== CURRENT_SCHEMA_VERSION) {
      const strategy = this.findMigrationStrategy(currentVersion);
      
      if (!strategy) {
        throw new Error(`No migration strategy found for version ${currentVersion}`);
      }

      console.log(`Applying migration: ${strategy.description}`);
      
      try {
        // Apply migration
        currentData = strategy.migrate(currentData);
        currentVersion = strategy.toVersion;
        
        // Validate migrated data
        if (!strategy.validate(currentData)) {
          throw new Error(`Migration validation failed for version ${strategy.toVersion}`);
        }
        
        console.log(`Successfully migrated to version ${currentVersion}`);
      } catch (error) {
        throw new Error(`Migration failed from ${strategy.fromVersion} to ${strategy.toVersion}: ${error}`);
      }
    }

    // Final validation
    if (!this.validateCurrentSchema(currentData)) {
      throw new Error('Final schema validation failed');
    }

    return currentData as OutlineData;
  }

  /**
   * Validate data against current schema
   */
  static validateCurrentSchema(data: any): boolean {
    return validateVersion100(data);
  }

  /**
   * Get migration path from a version to current version
   */
  static getMigrationPath(fromVersion: string): string[] {
    const path: string[] = [fromVersion];
    let currentVersion = fromVersion;

    while (currentVersion !== CURRENT_SCHEMA_VERSION) {
      const strategy = this.findMigrationStrategy(currentVersion);
      if (!strategy) {
        throw new Error(`No migration path found from version ${fromVersion}`);
      }
      currentVersion = strategy.toVersion;
      path.push(currentVersion);
    }

    return path;
  }

  /**
   * Check if migration is needed
   */
  static needsMigration(data: any): boolean {
    const dataVersion = data?.version || '0.9.0';
    return dataVersion !== CURRENT_SCHEMA_VERSION;
  }

  /**
   * Get migration info for a specific version
   */
  static getMigrationInfo(fromVersion: string): MigrationInfo {
    const needed = fromVersion !== CURRENT_SCHEMA_VERSION;
    
    if (!needed) {
      return { needed: false, path: [fromVersion], strategies: [] };
    }

    try {
      const path = this.getMigrationPath(fromVersion);
      const strategies: MigrationStrategy[] = [];
      
      for (let i = 0; i < path.length - 1; i++) {
        const strategy = this.findMigrationStrategy(path[i]);
        if (strategy) {
          strategies.push(strategy);
        }
      }

      return { needed: true, path, strategies };
    } catch (error) {
      throw new Error(`Cannot determine migration info: ${error}`);
    }
  }

  /**
   * Perform migration with detailed result
   */
  static async migrateWithResult(data: any): Promise<MigrationResult> {
    const originalVersion = data?.version || '0.9.0';
    
    try {
      const migratedData = await this.migrateToCurrentVersion(data);
      return {
        success: true,
        data: migratedData,
        migratedFrom: originalVersion,
        migratedTo: CURRENT_SCHEMA_VERSION
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        migratedFrom: originalVersion,
        migratedTo: CURRENT_SCHEMA_VERSION
      };
    }
  }

  /**
   * Get available migration strategies
   */
  static getAvailableStrategies(): MigrationStrategy[] {
    return [...MIGRATION_STRATEGIES];
  }

  /**
   * Get current schema version
   */
  static getCurrentVersion(): string {
    return CURRENT_SCHEMA_VERSION;
  }

  private static findMigrationStrategy(fromVersion: string): MigrationStrategy | null {
    return MIGRATION_STRATEGIES.find(strategy => strategy.fromVersion === fromVersion) || null;
  }
}

export default DataMigrationService;