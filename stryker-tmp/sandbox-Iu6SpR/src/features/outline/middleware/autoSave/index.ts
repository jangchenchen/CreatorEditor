// @ts-nocheck
import { Middleware } from '@reduxjs/toolkit';
import { AutoSaveManagerImpl } from './AutoSaveManager';
import { createAutoSaveMiddleware } from './createAutoSaveMiddleware';
import { AutoSaveUtils } from './AutoSaveUtils';
import { DEFAULT_AUTO_SAVE_CONFIG } from './types';

// Create singleton instance
const autoSaveManager = new AutoSaveManagerImpl(DEFAULT_AUTO_SAVE_CONFIG);

// Create middleware instance
export const autoSaveMiddleware: Middleware = createAutoSaveMiddleware(autoSaveManager);

// Export utilities for external use
export const autoSaveUtils = new AutoSaveUtils(autoSaveManager);

// Export manager for advanced usage
export { autoSaveManager };

// Export types for external use
export * from './types';

// Default export
export default autoSaveMiddleware;
