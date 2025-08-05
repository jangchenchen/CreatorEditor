/**
 * 自动保存控制Hook
 */

import { useCallback } from 'react';
import { autoSaveUtils } from '../../middleware/autoSaveMiddleware';

interface AutoSaveState {
  isInitialized: boolean;
  currentState: any;
  setError: (error: string | null) => void;
}

export const useAutoSaveControls = ({ 
  isInitialized, 
  currentState, 
  setError 
}: AutoSaveState) => {
  
  const enableAutoSave = useCallback(() => {
    autoSaveUtils.enable();
  }, []);

  const disableAutoSave = useCallback(() => {
    autoSaveUtils.disable();
  }, []);

  const forceSave = useCallback(async (): Promise<void> => {
    if (!isInitialized) {
      throw new Error('Storage not initialized');
    }

    try {
      setError(null);
      await autoSaveUtils.forceSave(currentState);
      console.log('Force save completed');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Force save failed';
      setError(errorMessage);
      throw err;
    }
  }, [currentState, isInitialized, setError]);

  return {
    enableAutoSave,
    disableAutoSave,
    forceSave
  };
};