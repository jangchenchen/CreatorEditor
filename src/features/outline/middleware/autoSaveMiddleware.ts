/**
 * Auto-Save Middleware for Local Storage
 * Works alongside syncMiddleware to provide automatic local persistence
 * Implements debounced saving to prevent excessive disk I/O
 */

import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { localStorageService } from '../services/localStorageService';

// Auto-save configuration
const AUTO_SAVE_CONFIG = {
  debounceDelay: 2000, // 2 seconds
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  enabledByDefault: true
};

// Actions that should trigger auto-save
const SAVE_TRIGGERING_ACTIONS = [
  // Project actions
  'outline/project/setProjectName',
  'outline/project/initializeProject',
  'outline/project/updateLastModified',
  
  // Story actions
  'outline/story/updateStoryBackground',
  'outline/story/updateCoreTheme',
  'outline/story/updateSynopsis',
  
  // Character actions
  'outline/characters/addCharacter',
  'outline/characters/updateCharacter',
  'outline/characters/deleteCharacter',
  'outline/characters/addRelationship',
  'outline/characters/updateRelationship',
  'outline/characters/deleteRelationship',
  
  // Timeline actions
  'outline/timeline/addPlotEvent',
  'outline/timeline/updatePlotEvent',
  'outline/timeline/deletePlotEvent',
  'outline/timeline/updateTimelineInfo',
  
  // Chapter actions
  'outline/chapters/addChapter',
  'outline/chapters/updateChapter',
  'outline/chapters/deleteChapter',
  'outline/chapters/updateChapterStructure',
  
  // Subplot actions
  'outline/subplots/addSubplot',
  'outline/subplots/updateSubplot',
  'outline/subplots/deleteSubplot',
  'outline/subplots/addSecondaryStory',
  'outline/subplots/updateSecondaryStory',
  'outline/subplots/deleteSecondaryStory',
  
  // Ideas actions
  'outline/ideas/addCreativeIdea',
  'outline/ideas/updateCreativeIdea',
  'outline/ideas/deleteCreativeIdea',
  'outline/ideas/updateIdeaStatus',
  'outline/ideas/addPlotAlternative',
  'outline/ideas/updatePlotAlternative',
  'outline/ideas/deletePlotAlternative'
];

class AutoSaveManager {
  private debounceTimer: NodeJS.Timeout | null = null;
  private isEnabled: boolean = AUTO_SAVE_CONFIG.enabledByDefault;
  private isSaving: boolean = false;
  private retryCount: number = 0;
  private lastSaveTime: number = 0;
  private pendingState: RootState | null = null;

  constructor() {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    try {
      await localStorageService.initialize();
      console.log('AutoSaveManager initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AutoSaveManager:', error);
      this.isEnabled = false;
    }
  }

  public enable(): void {
    this.isEnabled = true;
    console.log('Auto-save enabled');
  }

  public disable(): void {
    this.isEnabled = false;
    this.cancelPendingSave();
    console.log('Auto-save disabled');
  }

  public isAutoSaveEnabled(): boolean {
    return this.isEnabled;
  }

  public async triggerSave(state: RootState, immediate: boolean = false): Promise<void> {
    if (!this.isEnabled) {
      return;
    }

    this.pendingState = state;

    if (immediate) {
      this.cancelPendingSave();
      await this.performSave(state);
    } else {
      this.debouncedSave(state);
    }
  }

  private debouncedSave(state: RootState): void {
    // Cancel existing timer
    this.cancelPendingSave();

    // Set new timer
    this.debounceTimer = setTimeout(async () => {
      await this.performSave(state);
    }, AUTO_SAVE_CONFIG.debounceDelay);
  }

  private cancelPendingSave(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
  }

  private async performSave(state: RootState): Promise<void> {
    if (this.isSaving) {
      console.log('Save already in progress, skipping');
      return;
    }

    this.isSaving = true;
    const saveStartTime = Date.now();

    try {
      await localStorageService.saveState(state);
      
      this.lastSaveTime = saveStartTime;
      this.retryCount = 0;
      this.pendingState = null;
      
      console.log('Auto-save completed successfully');
      
      // Dispatch custom event for UI feedback
      this.dispatchSaveEvent('success', {
        timestamp: saveStartTime,
        duration: Date.now() - saveStartTime
      });
      
    } catch (error) {
      console.error('Auto-save failed:', error);
      
      // Retry logic
      if (this.retryCount < AUTO_SAVE_CONFIG.maxRetries) {
        this.retryCount++;
        console.log(`Retrying auto-save (attempt ${this.retryCount}/${AUTO_SAVE_CONFIG.maxRetries})`);
        
        setTimeout(async () => {
          await this.performSave(state);
        }, AUTO_SAVE_CONFIG.retryDelay * this.retryCount);
      } else {
        console.error('Auto-save failed after maximum retries');
        this.retryCount = 0;
        
        // Dispatch error event for UI feedback
        this.dispatchSaveEvent('error', {
          error: error.message,
          timestamp: saveStartTime,
          retries: AUTO_SAVE_CONFIG.maxRetries
        });
      }
    } finally {
      this.isSaving = false;
    }
  }

  private dispatchSaveEvent(type: 'success' | 'error', data: any): void {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('autosave', {
        detail: { type, data }
      });
      window.dispatchEvent(event);
    }
  }

  public getStatus(): {
    enabled: boolean;
    saving: boolean;
    lastSaveTime: number;
    retryCount: number;
    hasPendingChanges: boolean;
  } {
    return {
      enabled: this.isEnabled,
      saving: this.isSaving,
      lastSaveTime: this.lastSaveTime,
      retryCount: this.retryCount,
      hasPendingChanges: this.pendingState !== null
    };
  }

  public async forceSave(state: RootState): Promise<void> {
    this.cancelPendingSave();
    await this.performSave(state);
  }

  public dispose(): void {
    this.cancelPendingSave();
    this.isEnabled = false;
    this.pendingState = null;
    localStorageService.dispose();
  }
}

// Create singleton instance
const autoSaveManager = new AutoSaveManager();

/**
 * Auto-save middleware that works alongside sync middleware
 * Automatically saves state changes to local storage with debouncing
 */
export const autoSaveMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  // Let the action pass through first (including sync middleware)
  const result = next(action);
  
  // Check if this action should trigger auto-save
  const shouldTriggerSave = SAVE_TRIGGERING_ACTIONS.some(triggerAction => 
    action.type.includes(triggerAction) || action.type === triggerAction
  );
  
  if (shouldTriggerSave && autoSaveManager.isAutoSaveEnabled()) {
    // Get current state after all middleware has processed
    const currentState = store.getState();
    
    // Trigger debounced save
    autoSaveManager.triggerSave(currentState).catch(error => {
      console.error('Auto-save trigger failed:', error);
    });
  }
  
  return result;
};

// Export utilities for external use
export const autoSaveUtils = {
  /**
   * Enable auto-save functionality
   */
  enable(): void {
    autoSaveManager.enable();
  },

  /**
   * Disable auto-save functionality
   */
  disable(): void {
    autoSaveManager.disable();
  },

  /**
   * Check if auto-save is enabled
   */
  isEnabled(): boolean {
    return autoSaveManager.isAutoSaveEnabled();
  },

  /**
   * Get current auto-save status
   */
  getStatus() {
    return autoSaveManager.getStatus();
  },

  /**
   * Force immediate save
   */
  async forceSave(state: RootState): Promise<void> {
    await autoSaveManager.forceSave(state);
  },

  /**
   * Manually trigger save with optional immediate flag
   */
  async triggerSave(state: RootState, immediate: boolean = false): Promise<void> {
    await autoSaveManager.triggerSave(state, immediate);
  }
};

export default autoSaveMiddleware;