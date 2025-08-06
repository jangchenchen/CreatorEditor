/**
 * Validation and Cleanup Actions
 * Handles state validation and automated cleanup operations
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../../../app/store';
import {
  ReferentialIntegrityService,
  CleanupAction,
  ValidationResult,
} from '../../services/referentialIntegrityService';
import { executeCleanupAction } from './cleanupExecutors';

/**
 * Validate entire state and return report
 */
export const validateStateIntegrity = createAsyncThunk<
  ValidationResult,
  void,
  { state: RootState }
>('crossModule/validateStateIntegrity', async (_, { getState }) => {
  const state = getState().outline;
  return ReferentialIntegrityService.validateState(state);
});

/**
 * Execute automated cleanup of all integrity issues
 */
export const executeAutomatedCleanup = createAsyncThunk<
  CleanupAction[],
  void,
  { dispatch: AppDispatch; state: RootState }
>('crossModule/executeAutomatedCleanup', async (_, { dispatch, getState }) => {
  const state = getState().outline;
  const cleanupActions = ReferentialIntegrityService.generateCleanupActions(state);

  // Execute all cleanup actions
  for (const action of cleanupActions) {
    await executeCleanupAction(action, dispatch, getState);
  }

  return cleanupActions;
});

/**
 * Validate state and execute cleanup if needed
 */
export const validateAndCleanup = createAsyncThunk<
  { validation: ValidationResult; cleanupActions: CleanupAction[] },
  void,
  { dispatch: AppDispatch; state: RootState }
>('crossModule/validateAndCleanup', async (_, { dispatch, getState }) => {
  // First validate
  const state = getState().outline;
  const validation = ReferentialIntegrityService.validateState(state);

  let cleanupActions: CleanupAction[] = [];

  // If validation fails, execute cleanup
  if (!validation.isValid) {
    const result = await dispatch(executeAutomatedCleanup());
    cleanupActions = result.payload as CleanupAction[];
  }

  return { validation, cleanupActions };
});
