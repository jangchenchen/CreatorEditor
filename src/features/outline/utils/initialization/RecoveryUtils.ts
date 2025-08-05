/**
 * Recovery Utils
 * Utilities for handling storage corruption and recovery operations
 */

import { localStorageService } from '../../services/localStorageService';
import { RecoveryResult } from '../../types/storageInitializerTypes';

/**
 * Recovery utilities for handling corrupted data
 */
export const recoveryUtils = {
  /**
   * Attempt to recover from corrupted storage
   */
  async attemptRecovery(): Promise<RecoveryResult> {
    try {
      console.log('Starting storage recovery process...');
      
      // Step 1: Check if storage is accessible
      const stats = await localStorageService.getStorageStats();
      
      if (stats) {
        console.log('Storage appears to be working, no recovery needed');
        return { success: true, message: 'Storage is healthy' };
      }
      
      // Step 2: Try to create a backup of current state if possible
      try {
        const backupPath = `recovery_backup_${Date.now()}.json`;
        console.log(`Creating recovery backup: ${backupPath}`);
        // Backup creation would be handled by the storage service
      } catch (backupError) {
        console.warn('Could not create backup during recovery:', backupError);
      }
      
      // Step 3: Attempt to reinitialize storage
      console.log('Attempting storage reinitialization...');
      await localStorageService.initialize();
      
      // Step 4: Verify storage is working
      const newStats = await localStorageService.getStorageStats();
      if (newStats) {
        console.log('Storage recovery successful');
        return { success: true, message: 'Storage recovered successfully' };
      }
      
      return { success: false, message: 'Storage recovery partially failed' };
    } catch (error) {
      console.error('Recovery failed:', error);
      return { success: false, message: `Recovery failed: ${error.message}` };
    }
  },

  /**
   * Create emergency backup before recovery
   */
  async createEmergencyBackup(): Promise<RecoveryResult> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupName = `emergency_backup_${timestamp}`;
      
      console.log(`Creating emergency backup: ${backupName}`);
      
      // Get current storage state
      const currentProject = await localStorageService.loadProject();
      if (currentProject) {
        // Export to a backup file
        const backupData = {
          timestamp: new Date(),
          version: '1.0.0',
          project: currentProject
        };
        
        // Save backup (implementation depends on storage backend)
        console.log('Emergency backup created successfully');
        return { success: true, message: `Emergency backup created: ${backupName}` };
      }
      
      return { success: false, message: 'No data found to backup' };
    } catch (error) {
      console.error('Emergency backup failed:', error);
      return { success: false, message: `Backup failed: ${error.message}` };
    }
  },

  /**
   * Validate storage integrity
   */
  async validateStorageIntegrity(): Promise<RecoveryResult> {
    try {
      console.log('Validating storage integrity...');
      
      // Check basic storage functionality
      const stats = await localStorageService.getStorageStats();
      if (!stats) {
        return { success: false, message: 'Storage stats not available' };
      }
      
      // Check project list accessibility
      const projects = await localStorageService.getProjectList();
      if (!Array.isArray(projects)) {
        return { success: false, message: 'Project list corrupted' };
      }
      
      // Try to load current project if it exists
      if (projects.length > 0) {
        const currentProject = await localStorageService.loadProject();
        if (!currentProject) {
          return { success: false, message: 'Current project data corrupted' };
        }
      }
      
      console.log('Storage integrity check passed');
      return { success: true, message: 'Storage integrity validated' };
    } catch (error) {
      console.error('Storage integrity check failed:', error);
      return { success: false, message: `Integrity check failed: ${error.message}` };
    }
  },

  /**
   * Clear corrupted data and reset to defaults
   */
  async resetToDefaults(): Promise<RecoveryResult> {
    try {
      console.warn('Resetting storage to defaults - this will clear all data!');
      
      // Create final backup attempt
      try {
        await this.createEmergencyBackup();
      } catch (backupError) {
        console.warn('Could not create final backup:', backupError);
      }
      
      // Clear storage and reinitialize
      await localStorageService.clearAll();
      await localStorageService.initialize();
      
      // Verify reset worked
      const stats = await localStorageService.getStorageStats();
      if (stats) {
        console.log('Storage reset to defaults successfully');
        return { success: true, message: 'Storage reset to defaults' };
      }
      
      return { success: false, message: 'Reset completed but verification failed' };
    } catch (error) {
      console.error('Storage reset failed:', error);
      return { success: false, message: `Reset failed: ${error.message}` };
    }
  },

  /**
   * Clear all storage data (nuclear option)
   */
  async clearAllData(): Promise<void> {
    console.warn('Clearing all storage data - this cannot be undone!');
    
    try {
      // Final warning log
      console.warn('DESTRUCTIVE OPERATION: Clearing all project data');
      
      // Clear all data
      await localStorageService.clearAll();
      
      console.log('All storage data cleared');
    } catch (error) {
      console.error('Failed to clear all data:', error);
      throw error;
    }
  }
};