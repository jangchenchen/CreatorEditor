/**
 * Browser Database Manager
 * Browser-compatible version using localStorage instead of file system
 */

import { DatabaseSchema, defaultData, STORAGE_CONFIG } from './StorageConfig';

export class BrowserDatabaseManager {
  private data: DatabaseSchema;
  private isInitialized: boolean = false;
  private storageKey: string;

  constructor(storageKey: string = STORAGE_CONFIG.fileName) {
    this.storageKey = storageKey;
    this.data = { ...defaultData };
  }

  /**
   * Initialize the database
   */
  async initialize(): Promise<void> {
    try {
      await this.read();

      // Ensure database has proper structure
      if (!this.data || Object.keys(this.data).length === 0) {
        this.data = { ...defaultData };
        await this.write();
      }

      this.isInitialized = true;
      console.log('BrowserDatabaseManager initialized successfully');
    } catch (error) {
      console.error('Failed to initialize BrowserDatabaseManager:', error);
      throw new Error(`Database initialization failed: ${error}`);
    }
  }

  /**
   * Get database instance (compatible with Low interface)
   */
  getDb(): { data: DatabaseSchema; read: () => Promise<void>; write: () => Promise<void> } {
    this.ensureInitialized();
    return {
      data: this.data,
      read: () => this.read(),
      write: () => this.write(),
    };
  }

  /**
   * Read data from localStorage
   */
  async read(): Promise<void> {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.data = JSON.parse(stored);
      } else {
        this.data = { ...defaultData };
      }
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      this.data = { ...defaultData };
    }
  }

  /**
   * Write data to localStorage
   */
  async write(): Promise<void> {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (error) {
      console.error('Failed to write to localStorage:', error);
      throw error;
    }
  }

  /**
   * Get raw data
   */
  getData(): DatabaseSchema {
    this.ensureInitialized();
    return this.data;
  }

  /**
   * Set data directly
   */
  setData(newData: DatabaseSchema): void {
    this.ensureInitialized();
    this.data = newData;
  }

  /**
   * Check if initialized
   */
  isDbInitialized(): boolean {
    return this.isInitialized;
  }

  /**
   * Clear all data
   */
  async clear(): Promise<void> {
    this.data = { ...defaultData };
    localStorage.removeItem(this.storageKey);
  }

  /**
   * Get storage info
   */
  getStorageInfo(): { key: string; size: number } {
    const stored = localStorage.getItem(this.storageKey);
    return {
      key: this.storageKey,
      size: stored ? new Blob([stored]).size : 0,
    };
  }

  private ensureInitialized(): void {
    if (!this.isInitialized) {
      throw new Error('BrowserDatabaseManager not initialized. Call initialize() first.');
    }
  }
}
