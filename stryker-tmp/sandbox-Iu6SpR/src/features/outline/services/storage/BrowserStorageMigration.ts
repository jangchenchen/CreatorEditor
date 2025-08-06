/**
 * Browser Storage Migration
 * Handles data migration between versions using localStorage
 */
// @ts-nocheck


import { BrowserDatabaseManager } from './BrowserDatabaseManager';
import { STORAGE_CONFIG } from './StorageConfig';

export class BrowserStorageMigration {
  constructor(private dbManager: BrowserDatabaseManager) {}

  /**
   * Perform migration if needed
   */
  async performMigrationIfNeeded(): Promise<void> {
    try {
      const db = this.dbManager.getDb();
      await db.read();

      const currentVersion = db.data.version;

      if (currentVersion !== STORAGE_CONFIG.currentVersion) {
        console.log(
          `Migrating data from version ${currentVersion} to ${STORAGE_CONFIG.currentVersion}`
        );

        // Perform migration based on version differences
        await this.migrateData(currentVersion, STORAGE_CONFIG.currentVersion);

        db.data.version = STORAGE_CONFIG.currentVersion;
        db.data.settings.lastMigration = new Date().toISOString();
        await db.write();

        console.log('Migration completed successfully');
      }
    } catch (error) {
      console.error('Migration failed:', error);
      // Don't throw error to prevent app from crashing
    }
  }

  /**
   * Migrate data between versions
   */
  private async migrateData(fromVersion: string, toVersion: string): Promise<void> {
    const db = this.dbManager.getDb();

    // Version-specific migrations
    if (fromVersion === '0.9.0' && toVersion === '1.0.0') {
      await this.migrate090to100(db.data);
    }

    // Add more migrations as needed
    // Example: if (fromVersion === '1.0.0' && toVersion === '1.1.0') { ... }
  }

  /**
   * Migrate from v0.9.0 to v1.0.0
   */
  private async migrate090to100(data: any): Promise<void> {
    console.log('Migrating from v0.9.0 to v1.0.0');

    // Ensure new structure exists
    if (!data.projects) {
      data.projects = { current: null, saved: {} };
    }

    // Migrate old data format if it exists
    if (data.outline) {
      data.projects.current = data.outline;
      delete data.outline;
    }

    // Ensure settings have required fields
    if (!data.settings.autoSave) {
      data.settings.autoSave = true;
    }

    if (!data.settings.backupInterval) {
      data.settings.backupInterval = 300000; // 5 minutes
    }

    console.log('v0.9.0 to v1.0.0 migration completed');
  }

  /**
   * Get storage statistics
   */
  async getStorageStats(): Promise<{
    version: string;
    lastMigration?: string;
    totalSize: number;
    projectCount: number;
    backupCount: number;
  }> {
    try {
      const db = this.dbManager.getDb();
      await db.read();

      const storageInfo = this.dbManager.getStorageInfo();
      const savedProjects = db.data.projects?.saved || {};

      // Count backups
      let backupCount = 0;
      const prefix = `${STORAGE_CONFIG.fileName}_backup_`;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          backupCount++;
        }
      }

      return {
        version: db.data.version,
        lastMigration: db.data.settings?.lastMigration,
        totalSize: storageInfo.size,
        projectCount: Object.keys(savedProjects).length,
        backupCount,
      };
    } catch (error) {
      console.error('Failed to get storage stats:', error);
      return {
        version: 'unknown',
        totalSize: 0,
        projectCount: 0,
        backupCount: 0,
      };
    }
  }

  /**
   * Check if migration is needed
   */
  async isMigrationNeeded(): Promise<boolean> {
    try {
      const db = this.dbManager.getDb();
      await db.read();
      return db.data.version !== STORAGE_CONFIG.currentVersion;
    } catch (error) {
      return true; // Assume migration is needed if we can't check
    }
  }

  /**
   * Reset storage to default state
   */
  async resetStorage(): Promise<void> {
    try {
      await this.dbManager.clear();
      await this.dbManager.initialize();
      console.log('Storage reset to default state');
    } catch (error) {
      console.error('Failed to reset storage:', error);
      throw error;
    }
  }
}
