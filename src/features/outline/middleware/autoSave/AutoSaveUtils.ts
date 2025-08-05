import { RootState } from '../../../../app/store';
import { AutoSaveManagerImpl } from './AutoSaveManager';
import { AutoSaveStatus, AutoSaveMiddlewareAPI } from './types';

/**
 * Auto-save utilities for external use
 */
export class AutoSaveUtils implements AutoSaveMiddlewareAPI {
  constructor(private manager: AutoSaveManagerImpl) {}

  /**
   * Enable auto-save functionality
   */
  enable(): void {
    this.manager.enable();
  }

  /**
   * Disable auto-save functionality
   */
  disable(): void {
    this.manager.disable();
  }

  /**
   * Check if auto-save is enabled
   */
  isEnabled(): boolean {
    return this.manager.isAutoSaveEnabled();
  }

  /**
   * Get current auto-save status
   */
  getStatus(): AutoSaveStatus {
    return this.manager.getStatus();
  }

  /**
   * Force immediate save
   */
  async forceSave(state: RootState): Promise<void> {
    await this.manager.forceSave(state);
  }

  /**
   * Manually trigger save with optional immediate flag
   */
  async triggerSave(state: RootState, immediate: boolean = false): Promise<void> {
    await this.manager.triggerSave(state, immediate);
  }
}