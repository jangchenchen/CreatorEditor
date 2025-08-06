/**
 * Local Storage Service - Simplified Main Service
 * Orchestrates specialized storage components for the novel creation editor
 */

import { RootState } from '../../../app/store';
import { OutlineData } from '../types/outline.types';
import { BrowserDatabaseManager } from './storage/BrowserDatabaseManager';
import { BrowserStorageMigration } from './storage/BrowserStorageMigration';
import { BrowserBackupManager } from './storage/BrowserBackupManager';
import { BrowserProjectStorageService } from './storage/BrowserProjectStorageService';

export class LocalStorageService {
  private dbManager: BrowserDatabaseManager;
  private migrationService: BrowserStorageMigration;
  private backupManager: BrowserBackupManager;
  private projectService: BrowserProjectStorageService;
  private isInitialized: boolean = false;

  constructor(storageKey?: string) {
    this.dbManager = new BrowserDatabaseManager(storageKey);
    this.migrationService = new BrowserStorageMigration(this.dbManager);
    this.backupManager = new BrowserBackupManager(this.dbManager);
    this.projectService = new BrowserProjectStorageService(this.dbManager);
  }

  /**
   * Initialize the storage system
   */
  async initialize(): Promise<void> {
    try {
      await this.dbManager.initialize();
      await this.migrationService.performMigrationIfNeeded();

      this.isInitialized = true;
      console.log('LocalStorageService initialized successfully');
    } catch (error) {
      console.error('Failed to initialize LocalStorageService:', error);
      throw new Error(`Storage initialization failed: ${error}`);
    }
  }

  /**
   * Save Redux state to local storage
   */
  async saveState(state: RootState): Promise<void> {
    this.ensureInitialized();
    await this.projectService.saveState(state);
  }

  /**
   * Load project data
   */
  async loadProject(projectId?: string): Promise<OutlineData | null> {
    this.ensureInitialized();
    return await this.projectService.loadProject(projectId);
  }

  /**
   * Get list of all saved projects
   */
  async getProjectList(): Promise<Array<{ id: string; name: string; lastUpdated: Date }>> {
    this.ensureInitialized();
    return await this.projectService.getProjectList();
  }

  /**
   * Delete a project
   */
  async deleteProject(projectId: string): Promise<void> {
    this.ensureInitialized();
    await this.projectService.deleteProject(projectId);
  }

  /**
   * Create backup of current data
   */
  async createBackup(): Promise<string> {
    this.ensureInitialized();
    return await this.backupManager.createBackup();
  }

  /**
   * Export project data to JSON file
   */
  async exportProject(projectId: string, filePath: string): Promise<void> {
    this.ensureInitialized();
    await this.projectService.exportProject(projectId, filePath);
  }

  /**
   * Import project data from JSON file
   */
  async importProject(filePath: string): Promise<OutlineData> {
    this.ensureInitialized();
    return await this.projectService.importProject(filePath);
  }

  /**
   * Enable/disable auto-save
   */
  setAutoSave(enabled: boolean): void {
    this.ensureInitialized();
    this.backupManager.setAutoSave(enabled);
  }

  /**
   * Get storage statistics
   */
  async getStorageStats(): Promise<any> {
    this.ensureInitialized();
    return await this.migrationService.getStorageStats();
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    this.backupManager.dispose();
    this.isInitialized = false;
  }

  private ensureInitialized(): void {
    if (!this.isInitialized) {
      throw new Error('LocalStorageService not initialized. Call initialize() first.');
    }
  }
}

// Export singleton instance
export const localStorageService = new LocalStorageService();
