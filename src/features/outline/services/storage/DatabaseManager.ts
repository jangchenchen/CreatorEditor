/**
 * Database Manager
 * Manages LowDB database instance and basic operations
 */

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { DatabaseSchema, defaultData, STORAGE_CONFIG } from './StorageConfig';

export class DatabaseManager {
  private db: Low<DatabaseSchema>;
  private isInitialized: boolean = false;

  constructor(dataPath?: string) {
    const filePath = dataPath || this.getDefaultDataPath();
    const adapter = new JSONFile<DatabaseSchema>(filePath);
    this.db = new Low(adapter, defaultData);
  }

  /**
   * Initialize the database
   */
  async initialize(): Promise<void> {
    try {
      await this.db.read();

      // Ensure database has proper structure
      if (!this.db.data) {
        this.db.data = { ...defaultData };
      }

      this.isInitialized = true;
      console.log('DatabaseManager initialized successfully');
    } catch (error) {
      console.error('Failed to initialize DatabaseManager:', error);
      throw new Error(`Database initialization failed: ${error}`);
    }
  }

  /**
   * Get database instance
   */
  getDb(): Low<DatabaseSchema> {
    this.ensureInitialized();
    return this.db;
  }

  /**
   * Read data from database
   */
  async read(): Promise<void> {
    this.ensureInitialized();
    await this.db.read();
  }

  /**
   * Write data to database
   */
  async write(): Promise<void> {
    this.ensureInitialized();
    await this.db.write();
  }

  /**
   * Get raw data
   */
  getData(): DatabaseSchema {
    this.ensureInitialized();
    return this.db.data!;
  }

  /**
   * Check if initialized
   */
  isDbInitialized(): boolean {
    return this.isInitialized;
  }

  private ensureInitialized(): void {
    if (!this.isInitialized) {
      throw new Error('DatabaseManager not initialized. Call initialize() first.');
    }
  }

  private getDefaultDataPath(): string {
    // For Electron apps, use userData directory
    if (typeof window !== 'undefined' && (window as any).electronAPI) {
      return (window as any).electronAPI.getDataPath(STORAGE_CONFIG.fileName);
    }

    // Fallback for development/web
    return `./${STORAGE_CONFIG.fileName}`;
  }
}
