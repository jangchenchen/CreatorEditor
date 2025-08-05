/**
 * Character Cross-Module Actions
 * Handles character-related operations across multiple modules
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../../../app/store';
import { deleteCharacter, updateCharacter } from '../../slices/rootOutlineSlice';
import { ReferentialIntegrityService } from '../../services/referentialIntegrityService';
import { CharacterDeletionPayload, CharacterUpdatePayload } from './types';
import { generateCharacterCleanupActions } from './cleanupGenerators';
import { executeCleanupAction } from './cleanupExecutors';

/**
 * Safely delete a character with cascade cleanup across all modules
 */
export const deleteCharacterWithCleanup = createAsyncThunk<
  void,
  CharacterDeletionPayload,
  { dispatch: AppDispatch; state: RootState }
>(
  'crossModule/deleteCharacterWithCleanup',
  async ({ characterId, cascade = true }, { dispatch, getState }) => {
    const state = getState().outline;
    
    if (cascade) {
      // First, clean up all references to this character
      const cleanupActions = await generateCharacterCleanupActions(characterId, state);
      
      // Execute cleanup actions
      for (const action of cleanupActions) {
        await executeCleanupAction(action, dispatch, getState);
      }
    }
    
    // Finally, delete the character
    dispatch(deleteCharacter(characterId));
    
    // Validate state after deletion
    const newState = getState().outline;
    const validationResult = ReferentialIntegrityService.validateState(newState);
    
    if (!validationResult.isValid) {
      console.warn('Data integrity issues after character deletion:', validationResult.errors);
    }
  }
);

/**
 * Update character with propagation to related modules
 */
export const updateCharacterWithPropagation = createAsyncThunk<
  void,
  CharacterUpdatePayload,
  { dispatch: AppDispatch; state: RootState }
>(
  'crossModule/updateCharacterWithPropagation',
  async ({ character, propagateChanges = true }, { dispatch, getState }) => {
    // Update the character first
    dispatch(updateCharacter(character));
    
    if (propagateChanges) {
      // Currently, character updates typically don't require cascading changes
      // since references use IDs, but we could add validation or cache invalidation here
      
      // Validate state after update
      const newState = getState().outline;
      const validationResult = ReferentialIntegrityService.validateState(newState);
      
      if (!validationResult.isValid) {
        console.warn('Data integrity issues after character update:', validationResult.errors);
      }
    }
  }
);