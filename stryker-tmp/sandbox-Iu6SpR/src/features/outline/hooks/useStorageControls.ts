/**
 * Storage Controls Hook
 * Custom hook that manages storage control logic and state
 */
// @ts-nocheck


import { useState, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { StorageControlsState, StorageControlsHandlers } from '../types/storageControlsTypes';
import { createStorageHandlers } from '../utils/storageControlsHandlers';

export const useStorageControls = (
  currentProjectId?: string,
  onProjectLoad?: (projectId: string) => void
) => {
  const storage = useLocalStorage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Component state
  const [state, setState] = useState<StorageControlsState>({
    showSettings: false,
    showStats: false,
    showImportDialog: false,
    showExportDialog: false,
    exportPath: '',
    storageStats: null,
    snackbar: { open: false, message: '', severity: 'info' },
  });

  // Helper to update state
  const updateState = (updates: Partial<StorageControlsState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Create handlers using the factory function
  const storageHandlers = createStorageHandlers(
    storage,
    state,
    updateState,
    currentProjectId,
    onProjectLoad
  );

  // Additional handlers
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const closeSnackbar = () => {
    updateState({ snackbar: { ...state.snackbar, open: false } });
  };

  // State setters
  const setShowSettings = (show: boolean) => updateState({ showSettings: show });
  const setShowStats = (show: boolean) => updateState({ showStats: show });
  const setShowImportDialog = (show: boolean) => updateState({ showImportDialog: show });
  const setShowExportDialog = (show: boolean) => updateState({ showExportDialog: show });
  const setExportPath = (path: string) => updateState({ exportPath: path });

  const handlers: StorageControlsHandlers = {
    ...storageHandlers,
    handleImportClick,
    closeSnackbar,
    setShowSettings,
    setShowStats,
    setShowImportDialog,
    setShowExportDialog,
    setExportPath,
  };

  return {
    storage,
    state,
    handlers,
    fileInputRef,
  };
};
