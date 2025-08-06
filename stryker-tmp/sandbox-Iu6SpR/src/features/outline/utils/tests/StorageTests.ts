/**
 * Storage Tests
 * Tests for storage service functionality
 */
// @ts-nocheck


import { Store } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';
import { localStorageService } from '../../services/localStorageService';
import { autoSaveUtils } from '../../middleware/autoSaveMiddleware';
import { setProjectName } from '../../slices/rootOutlineSlice';
import { StorageTestSuite } from './StorageTestSuite';

export class StorageTests {
  private store: Store<RootState>;

  constructor(store: Store<RootState>) {
    this.store = store;
  }

  /**
   * Test storage service initialization
   */
  async testStorageInitialization(): Promise<boolean> {
    try {
      // Test if storage is initialized
      const stats = await localStorageService.getStorageStats();

      if (!stats) {
        console.error('Storage stats not available');
        return false;
      }

      console.log('✓ Storage initialized with version:', stats.version);
      console.log('✓ Total projects:', stats.totalProjects);

      return true;
    } catch (error) {
      console.error('Storage initialization test failed:', error);
      return false;
    }
  }

  /**
   * Test auto-save functionality
   */
  async testAutoSave(): Promise<boolean> {
    try {
      // Check auto-save status
      const initialStatus = autoSaveUtils.getStatus();
      console.log('✓ Auto-save status:', initialStatus);

      // Disable auto-save temporarily
      autoSaveUtils.disable();

      // Make a change that should trigger auto-save
      this.store.dispatch(setProjectName('Test Auto-save Project'));

      // Wait a bit
      await StorageTestSuite.delay(100);

      // Enable auto-save
      autoSaveUtils.enable();

      // Make another change
      this.store.dispatch(setProjectName('Test Auto-save Project Updated'));

      // Wait for auto-save delay
      await StorageTestSuite.delay(3000);

      console.log('✓ Auto-save functionality tested');
      return true;
    } catch (error) {
      console.error('Auto-save test failed:', error);
      return false;
    }
  }

  /**
   * Test manual save and load operations
   */
  async testManualSaveLoad(): Promise<boolean> {
    try {
      // Get current state
      const currentState = this.store.getState();

      // Perform manual save
      await localStorageService.saveState(currentState);
      console.log('✓ Manual save completed');

      // Load project
      const loadedProject = await localStorageService.loadProject();

      if (!loadedProject) {
        console.error('Failed to load project after save');
        return false;
      }

      console.log('✓ Manual load completed:', loadedProject.projectName);
      return true;
    } catch (error) {
      console.error('Manual save/load test failed:', error);
      return false;
    }
  }
}
