// @ts-nocheck
import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../../../../app/store';
import { AutoSaveManagerImpl } from './AutoSaveManager';
import { SAVE_TRIGGERING_ACTIONS } from './types';

/**
 * Creates auto-save middleware with the provided manager
 */
export const createAutoSaveMiddleware = (
  manager: AutoSaveManagerImpl
): Middleware<{}, RootState> => {
  return store => next => action => {
    // Let the action pass through first (including sync middleware)
    const result = next(action);

    // Check if this action should trigger auto-save
    const shouldTriggerSave = SAVE_TRIGGERING_ACTIONS.some(
      triggerAction => action.type.includes(triggerAction) || action.type === triggerAction
    );

    if (shouldTriggerSave && manager.isAutoSaveEnabled()) {
      // Get current state after all middleware has processed
      const currentState = store.getState();

      // Trigger debounced save
      manager.triggerSave(currentState).catch(error => {
        console.error('Auto-save trigger failed:', error);
      });
    }

    return result;
  };
};
