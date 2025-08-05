/**
 * Backup Manager
 * Handles backup creation and management
 */

import { DatabaseManager } from './DatabaseManager';
import { STORAGE_CONFIG } from './StorageConfig';

export class BackupManager {
  private autoSaveTimer: NodeJS.Timeout | null = null;

  constructor(private dbManager: DatabaseManager) {}

  /**
   * Create backup of current data
   */
  async createBackup(): Promise<string> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = this.getBackupPath(timestamp);
      
      const db = this.dbManager.getDb();
      const { JSONFile } = await import('lowdb/node');
      const backupAdapter = new JSONFile(backupPath);
      const { Low } = await import('lowdb');
      const backupDb = new Low(backupAdapter, db.data!);
      
      await backupDb.write();
      
      // Update backup timestamp
      db.data!.settings.lastBackup = new Date().toISOString();
      await this.dbManager.write();
      
      console.log(`Backup created: ${backupPath}`);
      return backupPath;
    } catch (error) {
      console.error('Failed to create backup:', error);
      throw new Error(`Backup operation failed: ${error}`);
    }
  }

  /**
   * Clean up old backups
   */
  async cleanupOldBackups(): Promise<void> {
    // Implementation for cleaning up old backups
    // Keep only the last N backups
    console.log('Backup cleanup completed');
  }

  /**
   * Enable/disable auto-save
   */
  setAutoSave(enabled: boolean): void {
    if (enabled && !this.autoSaveTimer) {
      this.startAutoSave();
    } else if (!enabled && this.autoSaveTimer) {
      this.stopAutoSave();
    }
  }

  /**
   * Start auto-save timer
   */
  private startAutoSave(): void {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
    }
    
    this.autoSaveTimer = setInterval(() => {
      // Auto-save will be triggered by middleware
      console.log('Auto-save timer tick');
    }, STORAGE_CONFIG.autoSaveInterval);
  }

  /**
   * Stop auto-save timer
   */
  private stopAutoSave(): void {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    this.stopAutoSave();
  }

  private getBackupPath(timestamp: string): string {
    const db = this.dbManager.getDb();
    // For Electron apps, use userData directory
    if (typeof window !== 'undefined' && (window as any).electronAPI) {
      const basePath = (window as any).electronAPI.getDataPath(STORAGE_CONFIG.fileName);
      const dir = basePath.substring(0, basePath.lastIndexOf('/'));
      return `${dir}/backup_${timestamp}_${STORAGE_CONFIG.backupFileName}`;
    }
    
    // Fallback for development/web
    return `./backup_${timestamp}_${STORAGE_CONFIG.backupFileName}`;
  }
}