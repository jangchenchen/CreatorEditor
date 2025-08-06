/**
 * Browser Backup Manager
 * Browser-compatible backup system using localStorage
 */
// @ts-nocheck


import { BrowserDatabaseManager } from './BrowserDatabaseManager';
import { STORAGE_CONFIG } from './StorageConfig';

export class BrowserBackupManager {
  private autoSaveTimer: number | null = null;

  constructor(private dbManager: BrowserDatabaseManager) {}

  /**
   * Create backup of current data in localStorage
   */
  async createBackup(): Promise<string> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupKey = `${STORAGE_CONFIG.fileName}_backup_${timestamp}`;

      const currentData = this.dbManager.getData();
      localStorage.setItem(backupKey, JSON.stringify(currentData));

      // Update backup timestamp in current data
      currentData.settings.lastBackup = new Date().toISOString();
      await this.dbManager.write();

      // Clean up old backups (keep only last 5)
      this.cleanupOldBackups();

      console.log(`Backup created: ${backupKey}`);
      return backupKey;
    } catch (error) {
      console.error('Failed to create backup:', error);
      throw new Error(`Backup operation failed: ${error}`);
    }
  }

  /**
   * Clean up old backups - keep only the last 5
   */
  async cleanupOldBackups(): Promise<void> {
    try {
      const backupKeys: string[] = [];
      const prefix = `${STORAGE_CONFIG.fileName}_backup_`;

      // Find all backup keys
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          backupKeys.push(key);
        }
      }

      // Sort by timestamp (newest first)
      backupKeys.sort((a, b) => {
        const timestampA = a.substring(prefix.length);
        const timestampB = b.substring(prefix.length);
        return timestampB.localeCompare(timestampA);
      });

      // Remove old backups (keep only the last 5)
      if (backupKeys.length > 5) {
        const toRemove = backupKeys.slice(5);
        toRemove.forEach(key => {
          localStorage.removeItem(key);
        });
        console.log(`Removed ${toRemove.length} old backups`);
      }
    } catch (error) {
      console.error('Failed to cleanup old backups:', error);
    }
  }

  /**
   * List available backups
   */
  getAvailableBackups(): Array<{ key: string; timestamp: string; size: number }> {
    const backups: Array<{ key: string; timestamp: string; size: number }> = [];
    const prefix = `${STORAGE_CONFIG.fileName}_backup_`;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        const timestamp = key.substring(prefix.length);
        const data = localStorage.getItem(key);
        const size = data ? new Blob([data]).size : 0;

        backups.push({
          key,
          timestamp: timestamp.replace(/-/g, ':'),
          size,
        });
      }
    }

    // Sort by timestamp (newest first)
    return backups.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  }

  /**
   * Restore from backup
   */
  async restoreFromBackup(backupKey: string): Promise<void> {
    try {
      const backupData = localStorage.getItem(backupKey);
      if (!backupData) {
        throw new Error(`Backup not found: ${backupKey}`);
      }

      const parsedData = JSON.parse(backupData);
      this.dbManager.setData(parsedData);
      await this.dbManager.write();

      console.log(`Restored from backup: ${backupKey}`);
    } catch (error) {
      console.error('Failed to restore from backup:', error);
      throw new Error(`Restore operation failed: ${error}`);
    }
  }

  /**
   * Set up auto-save
   */
  setAutoSave(enabled: boolean, intervalMs: number = 30000): void {
    if (this.autoSaveTimer) {
      window.clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }

    if (enabled) {
      this.autoSaveTimer = window.setInterval(async () => {
        try {
          await this.createBackup();
        } catch (error) {
          console.error('Auto-backup failed:', error);
        }
      }, intervalMs);

      console.log(`Auto-save enabled with ${intervalMs}ms interval`);
    } else {
      console.log('Auto-save disabled');
    }
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    if (this.autoSaveTimer) {
      window.clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
  }
}
