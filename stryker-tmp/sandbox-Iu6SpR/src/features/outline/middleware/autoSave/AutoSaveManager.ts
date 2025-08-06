// @ts-nocheck
import { RootState } from '../../../../app/store';
import { localStorageService } from '../../services/localStorageService';
import {
  AutoSaveConfig,
  AutoSaveStatus,
  SaveEventData,
  AutoSaveManager,
  DEFAULT_AUTO_SAVE_CONFIG,
} from './types';

export class AutoSaveManagerImpl implements AutoSaveManager {
  private debounceTimer: NodeJS.Timeout | null = null;
  private isEnabled: boolean = DEFAULT_AUTO_SAVE_CONFIG.enabledByDefault;
  private isSaving: boolean = false;
  private retryCount: number = 0;
  private lastSaveTime: number = 0;
  private pendingState: RootState | null = null;
  private config: AutoSaveConfig;

  constructor(config: Partial<AutoSaveConfig> = {}) {
    this.config = { ...DEFAULT_AUTO_SAVE_CONFIG, ...config };
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
    this.cancelPendingSave();
    this.debounceTimer = setTimeout(async () => {
      await this.performSave(state);
    }, this.config.debounceDelay);
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
      this.dispatchSaveEvent('success', {
        timestamp: saveStartTime,
        duration: Date.now() - saveStartTime,
      });
    } catch (error) {
      console.error('Auto-save failed:', error);

      if (this.retryCount < this.config.maxRetries) {
        this.retryCount++;
        console.log(`Retrying auto-save (attempt ${this.retryCount}/${this.config.maxRetries})`);

        setTimeout(async () => {
          await this.performSave(state);
        }, this.config.retryDelay * this.retryCount);
      } else {
        console.error('Auto-save failed after maximum retries');
        this.retryCount = 0;

        this.dispatchSaveEvent('error', {
          error: error.message,
          timestamp: saveStartTime,
          retries: this.config.maxRetries,
        });
      }
    } finally {
      this.isSaving = false;
    }
  }

  private dispatchSaveEvent(type: 'success' | 'error', data: Partial<SaveEventData>): void {
    if (typeof window !== 'undefined') {
      const eventData: SaveEventData = {
        timestamp: data.timestamp || 0,
        duration: data.duration || 0,
        error: data.error,
        retries: data.retries,
      };

      const event = new CustomEvent('autosave', {
        detail: { type, data: eventData },
      });
      window.dispatchEvent(event);
    }
  }

  public getStatus(): AutoSaveStatus {
    return {
      enabled: this.isEnabled,
      saving: this.isSaving,
      lastSaveTime: this.lastSaveTime,
      retryCount: this.retryCount,
      hasPendingChanges: this.pendingState !== null,
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
